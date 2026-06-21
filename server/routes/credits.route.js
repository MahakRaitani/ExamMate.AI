import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createCreditsOrder } from "../controllers/credits.controller.js";

const creditRouter = express.Router();

// Create Razorpay/Stripe order
creditRouter.post("/order", isAuth, createCreditsOrder);

export default creditRouter;
