import mongoose from "mongoose";

const EventAttendanceSchema = new mongoose.Schema(
  {
    contactName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketToken: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const EventAttendance = mongoose.model(
  "EventAttendance",
  EventAttendanceSchema,
);
