import Notes from "../models/notes.model.js";

import UserModel from "../models/user.model.js";

import { generateGeminiResponse } from "../services/gemini.services.js";

import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    // ============================
    // VALIDATION
    // ============================
    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // ============================
    // FIND USER
    // ============================
    const user = await UserModel.findById(
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ============================
    // CREDIT CHECK
    // ============================
  if ((user.credits || 0) < 0){
      user.isCreditAvailable = false;

      await user.save();

      return res.status(403).json({
        success: false,
        message: "Insufficient credits",
      });
    }

    // ============================
    // BUILD PROMPT
    // ============================
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    console.log("Prompt Generated");

    // ============================
    // GEMINI RESPONSE
    // ============================
    const aiResponse =
      await generateGeminiResponse(prompt);

    console.log("AI Response Received");

    if (
      !aiResponse ||
      typeof aiResponse !== "object"
    ) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response",
      });
    }

    // ============================
    // SAVE NOTES
    // ============================
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    // ============================
    // DEDUCT CREDITS
    // ============================
    user.credits =
      Math.max(0, (user.credits || 0) - 10);

    user.isCreditAvailable =
      user.credits > 0;

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);

    await user.save();

    // ============================
    // SUCCESS RESPONSE
    // ============================
    return res.status(200).json({
      success: true,
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });

  } catch (error) {
    console.error(
      "Generate Notes Error:",
      error
    );

    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
      error: error.message,
    });
  }
};