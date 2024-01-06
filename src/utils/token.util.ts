import { config } from "dotenv";
import { sign, verify } from "jsonwebtoken";
config();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (payload: {
  _id: string;
  role: "organizer" | "attendee";
  displayName: string;
  email: string;
}) => {
  const token: string = sign(payload, secret, { expiresIn: "7d" });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const payload = verify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
