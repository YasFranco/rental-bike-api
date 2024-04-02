import { Response, Request, NextFunction } from "express";
import db from "../db/bikes.json"

const validator = (req:Request, res:Response, next: NextFunction) => {
    const token = req.get("Authorization")
    if (!token) return res.status(401).json({ error: "ENTER_A_VALID_TOKEN" });

    const exists = db.users.find((user) => user.token === token)
    if(!exists) return res.status(409).json({error: "INCORRECT_TOKEN"});
    next();
}

export { validator }

