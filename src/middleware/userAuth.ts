import { Response, Request, NextFunction } from "express";
import db from "../db/bikes.json"

const validator = (req:Request, res:Response, next: NextFunction) => {
    const token = req.get("Authorization")
    if (!token) return res.status(401).json({ error: "ENTER_A_VALID_TOKEN" });

    const user = db.users.find((user) => user.token === token)
    if(!user) return res.status(404).json({error: "USER_NOT_FOUND"});
    next();
}

export { validator }

