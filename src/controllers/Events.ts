import { Response } from "express";
import { EventSchema } from "../validators";
import { safeParse } from "valibot";
import { validationMessages } from "../utils";
import { CustomReq } from "../middlewares";
import { Event } from "../models";

export const CreateEvent = async (req: CustomReq, res: Response) => {
  const body = req.body;
  const user = req.user;
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
    try {
      const event = await Event.create({
        ...result.output,
        organizer: user?._id,
      });

      return res.status(201).json({
        statusCode: 201,
        message: "Event created successfully",
        data: event,
      });
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        message: `Something went wrong: ${error.message}`,
      });
    }
  }
};

export const GetEvents = async (req: CustomReq, res: Response) => {
  try {
    const events = await Event.find().populate(
      "organizer",
      "-password -createdAt -updatedAt",
    );
    return res.status(200).json({
      statusCode: 200,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      message: `Something went wrong while fetching events: ${error.message}`,
    });
  }
};
