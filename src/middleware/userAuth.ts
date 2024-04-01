import { Response, Request, NextFunction } from "express";
import { users } from "../db/bikes.json"

const validator = (req:Request, res:Response, next: NextFunction) => {
    const token = req.get("Authorization");

    const exists = users.find((user) => user.token === token)
    if(!exists) return res.json({error: "PERMISSIONS_ARE_MISSING"});
    next();
}

export { validator }