import { Router } from "express";
import UserController from "../controller/userController";
import { validator } from "../middleware/userAuth";

const userRouter = Router();

// ---------------- GET -----------------
userRouter.get("/", UserController.readUsers);
userRouter.get("/:username", UserController.readUserById)

// ---------------- POST -----------------
userRouter.post("/register", UserController.createUser)
userRouter.post("/login", UserController.loginUser)



export default userRouter