import BikeModel from "../model/bikeModel";
import { Request, Response } from "express";
import crypto from "node:crypto"
import { validateBike, validateParcialBike } from "../validation/bikeValidation";

abstract class BikeController {

    static readAllBike = (req: Request, res: Response) => {

        const response = BikeModel.readAllBikes(req.query);
        res.json(response)
        // if(!response) return res.status(500).json({error: "SERVER_ERROR"})
    }

    static readBikeById = (req:Request, res:Response) => {
        const { id } = req.params;

        const response = BikeModel.readBikeById(id);
        if(!response) return res.status(404).json({error: "BIKE_NOT_FOUND"});

        res.json(response)
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

        if(response === 409) return res.status(409).json({error: "MODEL_ALREADY_EXISTS"})

        res.json({message: "BIKE_CREATED_SUCCESSFULLY"})
    }

    static deleteBike = (req: Request, res: Response) => {
        const { id } = req.params;

        const response = BikeModel.deleteBike(id);
        if(response === 404) return res.status(404).json({error: "BIKE_NOT_FOUND"})

        res.json({message: "BIKE_DELETED_SUCCESSFULLY"})
    }

    static updateBike = (req: Request, res: Response) => {
        
        const responseValidator = validateParcialBike(req.body);
        if(!responseValidator.success){
            return res.status(400).send(responseValidator.error);
        }
        
        const { id } = req.params;
        const  { type, model, colour, priceHour, quantity } = req.body

        const objData = { id, type, model, colour, priceHour, quantity };

        const response = BikeModel.updateBike(objData)

        if(response === 404) return res.status(404).json({error: "BIKE_NOT_FOUND"});

        res.json({message: "SUCCESSFULLY_MODIFIED_BIKE"})
    }
}

export default BikeController