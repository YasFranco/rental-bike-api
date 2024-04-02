import { Router } from "express";
import BikeController from "../controller/bikeController";
import { validator } from "../middleware/userAuth";

const bikeRouter = Router();

bikeRouter.get("/", validator, BikeController.readAllBike); 
bikeRouter.get("/:id", BikeController.readBikeById);
bikeRouter.post("/", BikeController.createBike);
bikeRouter.delete("/:id", BikeController.deleteBike);
bikeRouter.patch("/:id", BikeController.updateBike);


export default bikeRouter