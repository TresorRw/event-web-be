import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import {
  CreateEvent,
  DeleteEvent,
  GetEvent,
  EventAttendees,
  GetAllEvents,
  UpdateEvent,
  SearchEvents,
} from "../controllers";
import { forOrganizersOnly } from "../middlewares";

const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, forOrganizersOnly, CreateEvent);
EventRouter.get("/", GetAllEvents);
EventRouter.get("/search?", SearchEvents);
EventRouter.get("/:eventId", GetEvent);
EventRouter.get(
  "/:eventId/attendees",
  CheckAndVerifyAuthHeader,
  forOrganizersOnly,
  EventAttendees,
);
EventRouter.patch(
  "/:eventId",
  CheckAndVerifyAuthHeader,
  forOrganizersOnly,
  UpdateEvent,
);
EventRouter.delete(
  "/:eventId",
  CheckAndVerifyAuthHeader,
  forOrganizersOnly,
  DeleteEvent,
);

export default EventRouter;
