import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token)
    return res.status(401).json({ message: "Unauthorized: sign in required" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select("_id image name email role");
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized: account not found" });

    req.user = user.toJSON();
    res.locals.user = req.user;
    return next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "CastError"
    ) {
      return res
        .status(401)
        .json({ message: "Unauthorized: invalid or expired session" });
    }
    console.error("Session authentication failed:", error);
    return res.status(500).json({ message: "Unable to authenticate session" });
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN")
    return res
      .status(403)
      .json({ message: "Access denied: administrator only" });
  return next();
};
