import express, { Application } from "express";
import { config } from "dotenv";
import { connectDB } from "./utils";
import AuthRoutes from "./routes/auth.routes";
import EventRouter from "./routes/event.routes";
import cors from "cors";
config();

const app: Application = express();
const PORT = process.env.PORT || (3000 as number);
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Connect to DB
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    throw new Error(`Database connection error: ${error.message}`);
  });

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/events", EventRouter);

app.listen(PORT, () => {
  console.log(`🚀 app is running on ${PORT}`);
});
