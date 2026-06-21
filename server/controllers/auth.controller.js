import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

// GOOGLE LOGIN
export const googleAuth = async (req, res) => {
  try {

    const { name, email } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name,
        email
      });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ ADD THIS CHECK
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error); // 🔥 IMPORTANT

    return res.status(500).json({
      message: error.message
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google Login"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout Successfully"
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};