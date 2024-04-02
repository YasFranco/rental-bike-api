import { Router } from "express";
import UserController from "../controller/userController";
import { validator } from "../middleware/userAuth";

const userRouter = Router();

// --------------- GET -----------------
userRouter.get("/", validator , UserController.readUsers);
userRouter.get("/:email", validator, UserController.readUserByEmail)

// --------------- POST -----------------
userRouter.post("/register", UserController.createUser)
userRouter.post("/login", UserController.loginUser)

// --------- ----- PATCH ------------------
userRouter.patch("/:username",validator, UserController.updateUser)

// --------------- DELETE -----------------
userRouter.delete("/logout", validator, UserController.logout)
userRouter.delete("/:username", validator, UserController.deleteUser)



export default userRouter