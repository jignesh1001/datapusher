import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const user = await User.create({ email, password });
    res.status(201).json({
      success: true,
      token: generateToken(user),
      message: "Registration successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      token: generateToken(user),
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
