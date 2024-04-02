import { Router } from "express";
import BikeController from "../controller/bikeController";

const bikeRouter = Router();

bikeRouter.get("/", BikeController.getAllBike);
bikeRouter.post("/", BikeController.createBike);


export default bikeRouter