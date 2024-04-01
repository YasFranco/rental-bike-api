import { Router } from "express";
import UserController from "../controller/userController";

const userRouter = Router();

// ---------------- GET -----------------
userRouter.get("/", UserController.readUsers);
userRouter.get("/:username", UserController.readUserById)

// ---------------- POST -----------------
userRouter.post("/register", UserController.createUser)



export default userRouter