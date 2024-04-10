import mongoose from "mongoose";

export enum EventCategories {
  CONFERENCE = "conference",
  TRAVEL_ADVENTURES = "travel_adventures",
  CHARITY = "charity",
  SPORTS_FITNESS = "sports_fitness",
  CINEMA_MEDIA = "cinema_media",
  ARTS_CULTURE = "arts_culture",
  CONCERT = "concert",
  FOOD_DRINKS = "food_drinks",
  PERFORMANCE = "performance",
}

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(EventCategories),
    },
    description: {
      type: String,
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Event = mongoose.model("Event", eventSchema);
