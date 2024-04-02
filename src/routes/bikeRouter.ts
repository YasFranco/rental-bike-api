import { Router } from "express";
import BikeController from "../controller/bikeController";

const bikeRouter = Router();

bikeRouter.get("/", BikeController.readAllBike);
bikeRouter.get("/:id", BikeController.readBikeById);
bikeRouter.post("/", BikeController.createBike);
bikeRouter.delete("/:id", BikeController.deleteBike);
bikeRouter.patch("/:id", BikeController.updateBike);


export default bikeRouter