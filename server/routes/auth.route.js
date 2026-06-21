import express from "express";

import {
  googleAuth,
  logout,
  register,
  login
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

export default authRouter;