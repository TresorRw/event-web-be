import { LooseAuthProp } from "@clerk/clerk-sdk-node";
import { Request } from "express";

export {};

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}
