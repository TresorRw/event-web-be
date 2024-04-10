import { Router } from "express";
import { AllUsers, LogUser, RegisterUser } from "../controllers";

const AuthRoutes = Router();

AuthRoutes.post("/signup", RegisterUser);
AuthRoutes.post("/signin", LogUser);
// AuthRoutes.get("/users", AllUsers);

export default AuthRoutes;
