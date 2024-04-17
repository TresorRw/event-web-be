import type { Response } from "express";
import { CustomReq } from "../middlewares";
import { AttendEventSchema } from "../validators";
import { safeParse } from "valibot";
import { errorHandler, validationMessages, verifyObjectId } from "../utils";
import { randomUUID } from "crypto";
import { Event, EventTicket } from "../models";

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
    verifyObjectId(eventId, res);

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return errorHandler(res, 404, "We can not find the event");
    }
    // Check if a user already registered on an event
    const registeredEvent = await EventTicket.findOne({
      user: user?._id,
      event: eventId,
    });
    if (registeredEvent) {
      return errorHandler(res, 409, "You are already registered on this event");
    }

    try {
      // saving a user with the event
      const ticketToken = randomUUID();
      const ticket = await EventTicket.create({
        event: eventId,
        ticketToken,
        user: user?._id,
        ...result.output,
      });
      return res.status(201).json({
        statusCode: 201,
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
  const events = await EventTicket.find({ user: user?._id })
    .sort({
      createdAt: -1,
    })
    .populate("event", "name price");

  return res.status(200).json({
    statusCode: 200,
    message: "Events you have registred on",
    data: events,
  });
};

export const CancelTicket = async (req: CustomReq, res: Response) => {
  const user = req.user;
  const ticketId = req.params.ticketId;

  verifyObjectId(ticketId, res);

  // Check if ticket exists in attendees account
  const ticket = await EventTicket.findOne({
    _id: ticketId,
    user: user?._id,
  });
  if (!ticket) {
    return errorHandler(res, 404, "We can not find the ticket");
  }

  try {
    await EventTicket.findByIdAndDelete(ticketId);
    return res.status(200).json({
      statusCode: 200,
      message: "Ticket deleted successfully",
    });
  } catch (e: any) {
    return errorHandler(res, 500, `Something went wrong, try again!`);
  }
};

export const SingleTicket = async (req: CustomReq, res: Response) => {
  const user = req.user;
  const ticketId = req.params.ticketId;
  verifyObjectId(ticketId, res);
  const ticket = await EventTicket.findOne({
    _id: ticketId,
    user: user?._id,
  }).populate({
    path: "event",
    select: "-__v -createdAt -updatedAt",
    populate: {
      path: "organizer",
      select: "-__v -password -role -createdAt -updatedAt",
    },
  });
  if (!ticket) {
    return errorHandler(res, 404, "We can not find the ticket");
  }
  return res.status(200).json({
    statusCode: 200,
    message: "Ticket retrieved successfully",
    data: ticket,
  });
};
