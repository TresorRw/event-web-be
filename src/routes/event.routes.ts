import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import {
  CreateEvent,
  DeleteEvent,
  GetEvent,
  GetAllEvents,
  UpdateEvent,
  SearchEvents,
} from "../controllers";
import { forOrganizersOnly } from "../middlewares";

export const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, forOrganizersOnly, CreateEvent);
EventRouter.get("/", GetAllEvents);
EventRouter.get("/search?", SearchEvents);
EventRouter.get("/:eventId", CheckAndVerifyAuthHeader, GetEvent);
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
