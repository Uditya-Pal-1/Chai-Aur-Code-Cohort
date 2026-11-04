import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const publicUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  image: user.image,
});

const issueSession = (res, user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, cookieOptions);
};

export const register = async (req, res) => {
  const rawEmail = req.body?.email;
  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const password = req.body?.password;
  const rawName = req.body?.name;
  const name = typeof rawName === "string" ? rawName.trim() : undefined;

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    return res.status(400).json({
      error: "Enter a valid email and a password between 8 and 128 characters",
    });
  }

  try {
    const user = await User.create({
      email,
      password: await bcrypt.hash(password, 12),
      name,
    });
    issueSession(res, user);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .json({ error: "An account with this email already exists" });
    console.error("Account registration failed:", error);
    return res.status(500).json({ error: "Unable to create account" });
  }
};

export const login = async (req, res) => {
  const rawEmail = req.body?.email;
  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const password = req.body?.password;
  if (!email || typeof password !== "string")
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    issueSession(res, user);
    return res.json({
      success: true,
      message: "Signed in successfully",
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Sign in failed:", error);
    return res.status(500).json({ error: "Unable to sign in" });
  }
};

export const logout = (_req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ success: true, message: "Signed out successfully" });
};

export const check = (_req, res) =>
  res.json({
    success: true,
    message: "Session is valid",
    user: res.locals.user,
  });
