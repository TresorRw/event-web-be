import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: String,
    displayName: String,
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
