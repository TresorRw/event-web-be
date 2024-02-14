import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import { CreateEvent, GetEvent, GetEvents } from "../controllers/Events";
import { forOrganizersOnly } from "../middlewares";

const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, forOrganizersOnly, CreateEvent);
EventRouter.get("/", CheckAndVerifyAuthHeader, GetEvents);
EventRouter.get("/:eventId", CheckAndVerifyAuthHeader, GetEvent);

export default EventRouter;
