import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface TokenPayload {
  _id: string | Types.ObjectId;
  email: string;
}

export const generateToken = (user: TokenPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id: user._id.toString(), email: user.email }, secret, {
    expiresIn: "1d",
  });
};