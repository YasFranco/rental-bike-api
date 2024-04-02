import BikeModel from "../model/bikeModel";
import { Request, Response } from "express";
import crypto from "node:crypto"
import { validateBike, validateParcialBike } from "../validation/bikeValidation";

abstract class BikeController {

    static getAllBike = (req: Request, res: Response) => {
        const response = BikeModel.getAllBikes();
        if(!response) return res.status(500).json({error: "SERVER_ERROR"})
    }

    static createBike = (req: Request, res: Response) => {

        const responseValidator = validateBike(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }

        const { type, model, colour, priceHour, quantity } = req.body;
        const id = crypto.randomUUID()

        const newBike = { id, type, model, colour, priceHour, quantity }
        const response = BikeModel.createBike(newBike)

        if(response === 409) return res.status(500).json({error: "ERROR_TO_CREATE_MOVIE"})

        res.json({message: "BIKE_CREATED_SUCCESSFULLY"})
    }
}

export default BikeController