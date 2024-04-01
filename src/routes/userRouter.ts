import { Router } from "express";
import UserController from "../controller/userController";

const userRouter = Router();

userRouter.get("/", UserController.readUsers)

export default userRouter