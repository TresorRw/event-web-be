import { NextFunction, Response } from "express";
import { CustomReq } from "./auth.middleware";

export const forOrganizersOnly = (
  req: CustomReq,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role != "organizer") {
    return res.status(403).json({
      statusCode: 403,
      message: "You're not allowed to perform this action",
    });
  }
  next();
};
