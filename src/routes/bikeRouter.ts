import { Router } from "express";
import BikeController from "../controller/bikeController";
import { validator } from "../middleware/userAuth";

const bikeRouter = Router();

bikeRouter.get("/", validator, BikeController.readAllBike); 
bikeRouter.get("/:id", BikeController.readBikeById);
bikeRouter.post("/",validator, BikeController.createBike);
bikeRouter.delete("/:id",validator, BikeController.deleteBike);
bikeRouter.patch("/:id",validator, BikeController.updateBike);


export default bikeRouter