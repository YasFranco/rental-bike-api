import { Response, Request } from "express";
import UserModel from "../model/userModel";
import { validateParcialUser, validateUser } from "../validation/userValidation";
import crypto from "node:crypto"

abstract class UserController {
    static readUsers = (req: Request, res: Response) => {

        const response = UserModel.readUsers();
        if (!response) return res.status(500).json({ error: "SERVER_ERROR" })

        res.json(response)
    }

    static readUserByEmail = (req: Request, res: Response) => {
        const { email } = req.params;

        const response = UserModel.readUserByEmail(email);
        if (response.error) return res.status(404).json(response);

        res.json(response)
    }

    static createUser = (req: Request, res: Response) => {

        const responseValidator = validateUser(req.body);
        if (!responseValidator.success) {
            return res.status(400).send(responseValidator.error);
        }

        const { username, email, password, phone } = req.body;
        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");

        const newUser = { username, email, password: hashPassword, phone };
        const response = UserModel.createUser(newUser);

        if (response.error) return res.status(409).json()

        res.status(201).json(response)

    }

    static loginUser = (req: Request, res: Response) => {

        const responseValidator = validateParcialUser(req.body);
        if (!responseValidator.success) {
            return res.status(400).send(responseValidator.error);
        }

        const { username, password } = req.body;

        const response = UserModel.loginUser({ username, password });

        if (response === 404) return res.status(404).json({ error: "USER_NOT_FOUND" })
        if (response === 400) return res.status(400).json({ error: "BAD_REQUEST" })

        res.json(response)
    }

    static updateUser = (req: Request, res: Response) => {
        const responseValidator = validateParcialUser(req.body);
        if (!responseValidator.success) {
            return res.status(400).send(responseValidator.error);
        }
        
        const { username }  = req.params
        const {  email, password, phone } = req.body
        const objData = { username, email, password, phone }

        if (password) {
            const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
            objData.password = hashedPassword;
        }

        const response = UserModel.updateUser(objData)

        if (response.error) return res.status(404).json(response);

        res.json(response)
    }

    static deleteUser = (req: Request, res: Response) => {
        const { username } = req.params;

        const response = UserModel.deleteUser(username);
        if (response === 404) return res.status(404).json({ error: "USER_NOT_FOUND" })

        res.json(response)
    }

    static logout = (req: Request, res: Response) => {
        
        const { username } = req.body;
        

        const response = UserModel.logout(username);
        

        if (response.error) return res.status(404).json(response);

        res.json(response)
    }
}

export default UserController