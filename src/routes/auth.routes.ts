import { Router } from "express";
import { RegisterUser } from "../controllers/Auth";

const AuthRoutes = Router();

AuthRoutes.post("/signup", RegisterUser);

export default AuthRoutes;
