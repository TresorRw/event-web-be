import { Request, Response } from "express";
import { EventSchema } from "../validators";
import { safeParse } from "valibot";
import { errorHandler, validationMessages, verifyObjectId } from "../utils";
import { CustomReq } from "../middlewares";
import { Event, EventAttendance } from "../models";

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

export const GetAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .populate("organizer", "-password -createdAt -updatedAt")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      statusCode: 200,
      message: "Events retrieved successfully",
      data: events,
    });
  } catch (error: any) {
    return errorHandler(res, 500, `Something went wrong, try again!`);
  }
};

export const SearchEvents = async (req: Request, res: Response) => {
  const searchTerm = req.query.q as string;
  const category = req.query.cat;
  let filter: any = {};
  if (searchTerm) {
    const searchRegEx = new RegExp(searchTerm, "i");
    filter.name = { $regex: searchRegEx };
  }
  if (category) {
    filter.category = category;
  }
  const events = await Event.find(filter)
    .populate("organizer", "-password -role -createdAt -updatedAt")
    .sort({ created: -1 });
  if (events.length == 0) {
    return errorHandler(res, 404, `No events based on applied filters found`);
  } else {
    return res.status(200).json({
      statusCode: 200,
      message: `Events found based on applied filters`,
      data: events,
    });
  }
};

export const GetEvent = async (req: CustomReq, res: Response) => {
  const eventId = req.params.eventId;
  verifyObjectId(eventId, res);
  try {
    const event = await Event.findById(eventId).populate(
      "organizer",
      "-password -role -createdAt -updatedAt",
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
  verifyObjectId(eventId, res);

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
  verifyObjectId(eventId, res);

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

export const EventAttendees = async (req: CustomReq, res: Response) => {
  const user = req.user;
  const eventId = req.params.eventId;
  verifyObjectId(eventId, res);
  const event = await Event.find({ _id: eventId, organizer: user?._id });
  if (!event) {
    return errorHandler(
      res,
      404,
      `Event with ID: ${eventId} is not found in your account`,
    );
  }

  // Get tickets associated with the event
  const tickets = await EventAttendance.find({ event: eventId })
    .populate("user", "-password -createdAt -updatedAt -role")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    statusCode: 200,
    message: "Event attendees retrieved successfully",
    data: tickets,
  });
};
