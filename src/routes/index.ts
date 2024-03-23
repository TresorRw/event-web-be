import Router from "express";
import AuthRoutes from "./auth.routes";
import TicketRoutes from "./tickets.routes";
import EventRoutes from "./event.routes";
import swaggerSpec from "../docs/apiDoc";
import swaggerUI from "swagger-ui-express";

const router = Router();

router.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
router.use("/api/auth", AuthRoutes);
router.use("/api/events", EventRoutes);
router.use("/api/tickets", TicketRoutes);

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
