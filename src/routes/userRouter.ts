import { Router } from "express";
import UserController from "../controller/userController";
import { validator } from "../middleware/userAuth";

const userRouter = Router();


userRouter.get("/", validator , UserController.readUsers);
userRouter.get("/:email", validator, UserController.readUserByEmail)
userRouter.post("/register",  UserController.createUser)
userRouter.post("/login", UserController.loginUser)
userRouter.patch("/:username",validator, UserController.updateUser)
userRouter.delete("/logout", validator, UserController.logout)
userRouter.delete("/:username", validator, UserController.deleteUser)



export default userRouter