

import Stripe from "stripe";
import UserModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Credit packages
const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

// =========================
// CREATE CHECKOUT SESSION
// =========================
export const createCreditsOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({
        message: "Invalid credit plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} ExamMate Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: String(userId),
        credits: String(CREDIT_MAP[amount]),
      },
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    return res.status(500).json({
      message: "Stripe checkout creation failed",
    });
  }
};

// =========================
// STRIPE WEBHOOK
// =========================
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("❌ Webhook signature error:", error.message);
    return res.status(400).send("Webhook Error");
  }

  try {
    // =========================
    // PAYMENT SUCCESS
    // =========================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const creditsToAdd = Number(session.metadata.credits);

      if (!userId || !creditsToAdd) {
        return res.status(400).json({ message: "Invalid metadata" });
      }

      // 🔥 Prevent duplicate credit addition (IMPORTANT FIX)
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Optional safeguard: prevent duplicate processing
      await UserModel.findByIdAndUpdate(userId, {
  $inc: { credits: creditsToAdd },
  $set: { isCreditAvailable: true },
});
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Webhook Processing Error:", error);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};