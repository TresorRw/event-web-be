import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { IUser } from "../Interfaces";
import { verifyToken } from "../utils";
config();

export interface CustomReq extends Request {
  user?: IUser;
}

export const CheckAndVerifyAuthHeader = async (
  req: CustomReq,
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
    const decodedPayload = verifyToken(token);
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
    });
  }
};
