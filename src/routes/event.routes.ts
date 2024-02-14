import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import { CreateEvent } from "../controllers/Events";
import { forOrganizersOnly } from "../middlewares";

const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, forOrganizersOnly, CreateEvent);

export default EventRouter;
