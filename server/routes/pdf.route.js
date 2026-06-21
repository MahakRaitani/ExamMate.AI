import express from "express";
import isAuth from "../middleware/isAuth.js";
import { pdfDownload } from "../controllers/pdf.controller.js";

const pdfRouter = express.Router();

// Generate PDF from notes
pdfRouter.post("/generate", isAuth, pdfDownload);

export default pdfRouter;