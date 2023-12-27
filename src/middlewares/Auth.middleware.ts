import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction,
) {
  if (req.auth.userId) {
    next();
  } else {
    res.status(401).json({
      message: "You must be authenticated to access this resource",
    });
  }
}
