import { Router } from "express";
import { LogUser, RegisterUser } from "../controllers/Auth";

const AuthRoutes = Router();

AuthRoutes.post("/signup", RegisterUser);
AuthRoutes.post("/signin", LogUser);

export default AuthRoutes;
