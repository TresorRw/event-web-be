import mongoose from "mongoose";

enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
}

const EventTicketSchema = new mongoose.Schema(
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
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: "pending",
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

export const EventTicket = mongoose.model("EventTicket", EventTicketSchema);
