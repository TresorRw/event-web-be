import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../Interfaces";

declare module "express" {
  interface Request {
    user?: JwtPayload | String | IUser;
  }
}
