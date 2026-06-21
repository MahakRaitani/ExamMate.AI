import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    default: null
  },

  credits: {
    type: Number,
    default: 50,
    min: 0
  },

  isCreditAvailable: {
    type: Boolean,
    default: true
  },
stripeSessionIds: {
  type: [String],
  default: []
},
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  }]

}, { timestamps: true });

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;