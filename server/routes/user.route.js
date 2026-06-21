import express from "express";

import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

// GET CURRENT USER
userRouter.get("/current", isAuth, getCurrentUser);

export default userRouter;