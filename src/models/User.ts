import mongoose from "mongoose";

export enum UserRole {
  ORGANIZER = "organizer",
  ATTENDEE = "attendee",
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
      default: UserRole.ATTENDEE,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
