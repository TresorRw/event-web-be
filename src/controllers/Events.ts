import { Request, Response } from "express";
import { EventSchema } from "../validators";
import { safeParse } from "valibot";
import { validationMessages } from "../utils";

export async function CreateEvent(req: Request, res: Response) {
  const body = req.body;
  const result = safeParse(EventSchema, body);
  if (result.issues) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid body",
      errors: validationMessages(result.issues),
    });
  }
  if (result.success) {
    return res.status(201).json({
      statusCode: 201,
      message: "Event created successfully",
      data: result.output,
    });
  }
}
