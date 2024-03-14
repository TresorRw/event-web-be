import { Router } from "express";
import { CheckAndVerifyAuthHeader, forOrganizersOnly } from "../middlewares";
import {
  CancelTicket,
  MyAttendees,
  MyEvents,
  RegisterOnEvent,
} from "../controllers";

export const AttendanceRouter = Router();

AttendanceRouter.post("/register", CheckAndVerifyAuthHeader, RegisterOnEvent);
AttendanceRouter.get("/my-events", CheckAndVerifyAuthHeader, MyEvents);
AttendanceRouter.get(
  "/my-attendees",
  CheckAndVerifyAuthHeader,
  forOrganizersOnly,
  MyAttendees,
);
AttendanceRouter.delete(
  "/cancel-ticket",
  CheckAndVerifyAuthHeader,
  CancelTicket,
);
