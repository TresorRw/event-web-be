import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import { CreateEvent, GetEvents } from "../controllers/Events";
import { forOrganizersOnly } from "../middlewares";

const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, forOrganizersOnly, CreateEvent);
EventRouter.get("/", CheckAndVerifyAuthHeader, GetEvents);

export default EventRouter;
