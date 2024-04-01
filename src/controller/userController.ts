import { Response, Request, NextFunction } from "express";
import UserModel from "../model/userModel";

abstract class UserController {
    static readUsers = (req: Request, res:Response) => {

        const response = UserModel.readUsers();
        if(!response) return res.status(500).json({error: "SERVER_ERROR"})

        res.json(response)
    }
}

export default UserController