import { Request, Response } from "express";
import { hashPassword, validationMessages } from "../utils";
import { User } from "../models";
import { RegsiterSchema } from "../validators";
import { Issues, safeParse } from "valibot";

export const RegisterUser = async (req: Request, res: Response) => {
  const body = req.body;
  const result = safeParse(RegsiterSchema, body);
  if (result.success) {
    res.status(200).json(result.output);
  }
  if (result.issues) {
    res
      .status(400)
      .json({ statusCode: 400, message: validationMessages(result.issues) });
  }
};
