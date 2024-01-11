import { Router } from "express";
import { CheckAndVerifyAuthHeader } from "../middlewares/auth.middleware";
import { CreateEvent } from "../controllers/Events";

const EventRouter = Router();

EventRouter.post("/", CheckAndVerifyAuthHeader, CreateEvent);

export default EventRouter;
