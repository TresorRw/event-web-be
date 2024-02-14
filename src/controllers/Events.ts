import { Response } from "express";
import { EventSchema } from "../validators";
import { safeParse } from "valibot";
import { errorHandler, validationMessages } from "../utils";
import { CustomReq } from "../middlewares";
import { Event } from "../models";
import { isValidObjectId } from "mongoose";

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
      return errorHandler(res, 500, `Something went wrong: ${error.message}`);
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
    return errorHandler(res, 500, `Something went wrong, try again!`);
  }
};

export const GetEvent = async (req: CustomReq, res: Response) => {
  const eventId = req.params.eventId;
  if (!isValidObjectId(eventId)) {
    return errorHandler(res, 400, "Invalid event ID, provide correct an ID");
  }
  try {
    const event = await Event.findById(eventId).populate(
      "organizer",
      "-password -createdAt -updatedAt",
    );
    if (!event) {
      return errorHandler(res, 404, `Event with ID: ${eventId} not found`);
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Event retrieved successfully",
      data: event,
    });
  } catch (error: any) {
    return errorHandler(res, 500, `Something went wrong, try again!`);
  }
};

export const UpdateEvent = async (req: CustomReq, res: Response) => {
  const eventId = req.params.eventId;
  if (!isValidObjectId(eventId)) {
    return errorHandler(res, 400, "Invalid event ID, provide correct an ID");
  }
  const body = req.body;
  const event = await Event.findOne({ _id: eventId, organizer: req.user?._id });
  if (!event) {
    return errorHandler(res, 404, `Event with ID: ${eventId} is not found`);
  }
  const result = safeParse(EventSchema, body);
  if (result.issues) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid body",
      errors: validationMessages(result.issues),
    });
  }
  if (result.success) {
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          ...result.output,
        },
        { new: true },
      );
      return res.status(200).json({
        statusCode: 200,
        message: "Event updated successfully",
        data: updatedEvent,
      });
    } catch (error: any) {
      return errorHandler(res, 500, `Something went wrong, try again!`);
    }
  }
};

export const DeleteEvent = async (req: CustomReq, res: Response) => {
  const eventId = req.params.eventId;
  if (!isValidObjectId(eventId)) {
    return errorHandler(res, 400, "Invalid event ID, provide correct an ID");
  }
  const event = await Event.findOne({ _id: eventId, organizer: req.user?._id });
  if (!event) {
    return errorHandler(res, 404, `Event with ID: ${eventId} is not found`);
  }
  try {
    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({
      statusCode: 200,
      message: "Event deleted successfully",
    });
  } catch (error: any) {
    return errorHandler(res, 500, `Something went wrong, try again!`);
  }
};
