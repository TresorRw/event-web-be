import express, { Application } from "express";
import { config } from "dotenv";
import { connectDB } from "./utils";
import AuthRoutes from "./routes/auth.routes";
config();

const app: Application = express();
const PORT = process.env.PORT || (3000 as number);
app.use(express.json());

// Connect to DB
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    throw new Error(`Database connection error: ${error.message}`);
  });

// Routes
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`🚀 app is running on ${PORT}`);
});
