import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { connectDB } from "./utils";
config();

const app: Application = express();
const PORT = process.env.PORT || (3000 as number);
app.use(express.json());

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    throw new Error(`Database connection error: ${error.message}`);
  });

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`🚀 app is running on ${PORT}`);
});
