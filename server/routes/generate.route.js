import express from "express";

import isAuth from "../middleware/isAuth.js";

import { generateNotes } from "../controllers/generate.controller.js";

import {
  getMyNotes,
  getSingleNotes,
} from "../controllers/notes.controller.js";

const notesRouter = express.Router();

// ============================
// GENERATE NOTES
// ============================
notesRouter.post(
  "/generate",
  isAuth,
  generateNotes
);

// ============================
// GET USER NOTES
// ============================
notesRouter.get(
  "/my",
  isAuth,
  getMyNotes
);

// ============================
// GET SINGLE NOTE
// ============================
notesRouter.get(
  "/:id",
  isAuth,
  getSingleNotes
);

export default notesRouter;