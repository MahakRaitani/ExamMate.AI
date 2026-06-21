import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // FIXED (must match User model name)
      required: true,
      index: true
    },

    topic: {
      type: String,
      required: true,
      trim: true
    },

    classLevel: {
      type: String,
      default: ""
    },

    examType: {
      type: String,
      default: "General"
    },

    revisionMode: {
      type: Boolean,
      default: false
    },

    includeDiagram: {
      type: Boolean,
      default: false
    },

    includeChart: {
      type: Boolean,
      default: false
    },

    content: {
      type: Object, // safer than Mixed for structured AI JSON
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for fast user notes retrieval
notesSchema.index({ user: 1, createdAt: -1 });

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;