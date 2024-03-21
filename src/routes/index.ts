import Router from "express";
import swaggerui from "swagger-ui-express";
import swaggerSpecs from "../docs/apiDoc";
import AuthRoutes from "./auth.routes";
import AttendanceRoutes from "./attendance.routes";
import EventRoutes from "./event.routes";

const router = Router();

router.use(
  "/api/docs",
  swaggerui.serve,
  swaggerui.setup(swaggerSpecs, { explorer: true }),
);
router.use("api/auth", AuthRoutes);
router.use("api/events", EventRoutes);
router.use("api/event-attendance", AttendanceRoutes);

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
