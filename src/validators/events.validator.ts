import * as v from "valibot";
import { EventCategories } from "../models";

export const EventSchema = v.object({
  name: v.string("Event name should be string", [
    v.minLength(3, "Event name should be at least 3 characters"),
  ]),
  description: v.string("Event description should be string", [
    v.minLength(3, "Event description should be at least 3 characters"),
  ]),
  category: v.enum_(
    EventCategories,
    "Event category should be one of the following: " +
      Object.values(EventCategories).join(", "),
  ),
  startDateTime: v.string("Event start date should be a valid date"),
  endDateTime: v.string("Event end date should be a valid date"),
  location: v.string("Event location should be string"),
  price: v.number("Event price should be a number"),
});
