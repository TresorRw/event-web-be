import { Response } from "express";
import { EventSchema } from "../validators";
import { safeParse } from "valibot";
import { validationMessages } from "../utils";
import { CustomReq } from "../middlewares";
import { Event } from "../models";

export async function CreateEvent(req: CustomReq, res: Response) {
  const body = req.body;
  const user = req.user;
  // console.log(user);
  const result = safeParse(EventSchema, body);
  if (result.issues) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid body",
      errors: validationMessages(result.issues),
    });
  }

  // Save to database
  if (result.success) {
    const event = await Event.create({
      ...result.output,
      organizer: user?._id,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Event created successfully",
      data: event,
    });
  }
}
