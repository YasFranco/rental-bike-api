import { Response, Request, NextFunction } from "express";
import UserModel from "../model/userModel";
import { validateUser } from "../middleware/auth";

abstract class UserController {
    static readUsers = (req: Request, res:Response) => {

        const response = UserModel.readUsers();
        if(!response) return res.status(500).json({error: "SERVER_ERROR"})

        res.json(response)
    }

    static readUserById = (req:Request, res:Response) => {
        const { username } = req.params;

        const response = UserModel.readUserById(username);
        if(!response) return res.status(404).json({error: "USER_NOT_FOUND"});

        res.json(response)
    }

    static createUser = (req:Request, res:Response) => {

        const responseValidator = validateUser(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }

        const { username, email, password, phone } = req.body;
        
        const newUser = { username, email, password, phone };
        const response = UserModel.createUser(newUser);

        if(response === 409) {
           return res.status(409).json("USER_ALREADY_EXISTS")
        } 

        res.status(201).json("USER_CREATED_SUCCESSFULLY")

    }
}

export default UserController