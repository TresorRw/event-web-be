import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
config();

const app: Application = express();
const PORT = process.env.PORT || (3000 as number);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`🚀 app is running on ${PORT}`);
});
