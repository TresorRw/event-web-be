import type { Response } from "express";
import { CustomReq } from "../middlewares";
import { AttendEventSchema } from "../validators";
import { safeParse } from "valibot";
import { errorHandler, validationMessages } from "../utils";
import { randomUUID } from "crypto";
import { Event, EventAttendance } from "../models";
import { isValidObjectId } from "mongoose";

export const RegisterOnEvent = async (req: CustomReq, res: Response) => {
  const user = req.user;
  const body = req.body;
  const result = safeParse(AttendEventSchema, body);
  if (result.issues) {
    return res.status(400).json({
      statusCode: 400,
      message: "Please see the errors",
      errors: validationMessages(result.issues),
    });
  }

  if (result.success) {
    const { eventId } = result.output;
    if (!isValidObjectId(eventId)) {
      return errorHandler(res, 400, "Invalid event ID, provide correct an ID");
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return errorHandler(res, 404, "We can not find the event");
    }
    // Check if a user already registered on an event
    const registeredEvent = await EventAttendance.findOne({
      user: user?._id,
      event: eventId,
    });
    if (registeredEvent) {
      return errorHandler(res, 409, "You are already registered on this event");
    }

    try {
      // saving a user with the event
      const ticketToken = randomUUID();
      const ticket = await EventAttendance.create({
        event: eventId,
        ticketToken,
        user: user?._id,
        ...result.output,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Ticket created successfully",
        data: ticket,
      });
    } catch (error: any) {
      return errorHandler(res, 500, `Something went wrong: ${error.message}`);
    }
  }
};

export const MyEvents = async (req: CustomReq, res: Response) => {
  const user = req.user;
  // get all events user have registered on
  const events = await EventAttendance.find({ user: user?._id })
    .populate({
      path: "event",
      select: "-__v -createdAt -updatedAt",
      populate: {
        path: "organizer",
        select: "-__v -password -role -createdAt -updatedAt",
      },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    statusCode: 200,
    message: "Events you have registred on",
    data: events,
  });
};

export const CancelTicket = async (req: CustomReq, res: Response) => {
  const user = req.user;
  // const events = await Event.find({ organizer: user?._id }).populate({
  //   path: "eventattendance",
  //   select: "-__v -createdAt -updatedAt",
  //   populate: {
  //     path: "user",
  //     select: "-__v -password -role -createdAt -updatedAt",
  //   }
  // });
  // return res.status(200).json({
  //   statusCode: 200,
  //   message: "Your events ",
  //   data: events,
  // });
};
