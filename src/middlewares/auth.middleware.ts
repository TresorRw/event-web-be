import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
config();

export const CheckAndVerifyAuthHeader = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      statusCode: 401,
      message: "Authorization header is missing",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
