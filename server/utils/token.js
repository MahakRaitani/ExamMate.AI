import jwt from "jsonwebtoken";

export const getToken = async (user) => {
  try {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    console.log(error);
    return null;
  }
};