import { Router } from "express";
import { CheckAndVerifyAuthHeader, forOrganizersOnly } from "../middlewares";
import {
  CancelTicket,
  MyEvents,
  RegisterOnEvent,
  SingleTicket,
} from "../controllers";

const TicketRouter = Router();

TicketRouter.post("/buy", CheckAndVerifyAuthHeader, RegisterOnEvent);
TicketRouter.get("/", CheckAndVerifyAuthHeader, MyEvents);
TicketRouter.get("/:ticketId", CheckAndVerifyAuthHeader, SingleTicket);
TicketRouter.delete(
  "/:ticketId/cancel",
  CheckAndVerifyAuthHeader,
  CancelTicket,
);

export default TicketRouter;
