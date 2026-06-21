import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./configs/db.js";

// ROUTES
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";

// CONTROLLER
import { stripeWebhook } from "./controllers/credits.controller.js";

dotenv.config();

const app = express();

// ===================================
// STRIPE WEBHOOK
// ===================================
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ===================================
// MIDDLEWARES
// ===================================
app.use(express.json());

app.use(cookieParser());

// ===================================
// CORS
// ===================================
app.use(
  cors({
    origin: "https://exammate-aiclient.onrender.com",
    credentials: true,
  })
);

// ===================================
// TEST ROUTE
// ===================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Running",
  });
});

// ===================================
// API ROUTES
// ===================================
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/notes", notesRouter);

app.use("/api/pdf", pdfRouter);

app.use("/api/credits", creditRouter);

// ===================================
// START SERVER
// ===================================
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {

  console.log(`Server running on ${PORT}`);

  await connectDB();

});
