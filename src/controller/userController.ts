import { Response, Request, NextFunction } from "express";
import UserModel from "../model/userModel";

abstract class UserController {
    static readUsers = (req: Request, res:Response) => {
        const response = UserModel.readUsers();
        res.json(response)
    }
}

export default UserController