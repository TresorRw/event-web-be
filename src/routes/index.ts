import Router from "express";
import AuthRoutes from "./auth.routes";
import AttendanceRoutes from "./attendance.routes";
import EventRoutes from "./event.routes";
import swaggerSpec from "../docs/apiDoc";
import swaggerUI from "swagger-ui-express";

const router = Router();

router.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use("/api/auth", AuthRoutes);
router.use("/api/events", EventRoutes);
router.use("/api/event-attendance", AttendanceRoutes);

router.all("/api/", (req, res) => {
  return res
    .status(200)
    .json({ statusCode: 200, message: "Welcome to the event management API" });
});

router.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

export default router;
