import { Router } from "express";
import { CheckAndVerifyAuthHeader, forOrganizersOnly } from "../middlewares";
import { CancelTicket, MyEvents, RegisterOnEvent } from "../controllers";

const AttendanceRouter = Router();

AttendanceRouter.post("/register", CheckAndVerifyAuthHeader, RegisterOnEvent);
AttendanceRouter.get("/my-events", CheckAndVerifyAuthHeader, MyEvents);
AttendanceRouter.delete(
  "/cancel-ticket/:ticketId",
  CheckAndVerifyAuthHeader,
  CancelTicket,
);

export default AttendanceRouter;
