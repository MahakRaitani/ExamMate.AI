import Notes from "../models/notes.model.js";

// =========================
// GET ALL USER NOTES
// =========================
export const getMyNotes = async (req, res) => {

  try {

    console.log("USER ID:", req.userId)

    const notes = await Notes.find({
      user: req.userId
    })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes
    });

  } catch (error) {

    console.log("GET NOTES ERROR:", error)

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// =========================
// GET SINGLE NOTE
// =========================
export const getSingleNotes = async (req, res) => {

  try {

    const { id } = req.params;

    const note = await Notes.findOne({
      _id: id,
      user: req.userId,
    });

    if (!note) {

      return res.status(404).json({
        success: false,
        message: "Note not found",
      });

    }

    return res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {

    console.log("GET SINGLE NOTE ERROR:", error)

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};