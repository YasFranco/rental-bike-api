import { Response, Request } from "express";
import UserModel from "../model/userModel";
import { validateParcialUser, validateUser } from "../validation/userValidation";
import crypto from "node:crypto"

abstract class UserController {
    static readUsers = (req: Request, res:Response) => {

        const response = UserModel.readUsers();
        if(!response) return res.status(500).json({error: "SERVER_ERROR"})

        res.json(response)
    }

    static readUserByEmail = (req:Request, res:Response) => {
        const { email } = req.params;

        const response = UserModel.readUserByEmail(email);
        if(!response) return res.status(404).json({error: "USER_NOT_FOUND"});

        res.json(response)
    }

    static createUser = (req:Request, res:Response) => {

        const responseValidator = validateUser(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }
        
        const { username, email, password, phone } = req.body;
        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
        
        const newUser = { username, email, password: hashPassword , phone };
        const response = UserModel.createUser(newUser);

        if(response === 409) return res.status(409).json({error: "USER_ALREADY_EXISTS"})

        res.status(201).json({message: "USER_CREATED_SUCCESSFULLY"})

    }

    static loginUser = (req: Request, res: Response) => {

        const responseValidator = validateParcialUser(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }

        const { username, password } = req.body;

        const response = UserModel.loginUser({ username, password });

        if(response === 404) return res.status(404).json({error: "USER_NOT_FOUND"})
        if(response === 400) return res.status(400).json({error: "BAD_REQUEST"})

        res.json({message: "LOGGED_IN_USER"})
    }

    static updateUser = (req: Request, res: Response) => {
        const responseValidator = validateParcialUser(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }
        const { username} = req.params
        const { email, password, phone } = req.body
        const objData = { username, email, password, phone }

        const response = UserModel.updateUser(objData)

        if(response === 404) return res.status(404).json({ error: "USER_NOT_FOUND"});

        res.json({message: "SUCCESSFULLY_MODIFIED_USER"})
    }

    static deleteUser = (req: Request, res: Response) => {
        const { username } = req.params;

        const response = UserModel.deleteUser(username);
        if(response === 404) return res.status(404).json({error: "USER_NOT_FOUND"})

        res.json({message: "USER_DELETED_SUCCESSFULLY"})
    }

    static logoutUser = (req: Request, res: Response) => {
        const { username } = req.body;
        console.log(username)

        const response = UserModel.logoutUser(username);

        if(response === 404) return res.status(404).json({ error: "USER_NOT_FOUND"});

        res.json({message: "LOGGED_OUT_USER"})
    }
}

export default UserController