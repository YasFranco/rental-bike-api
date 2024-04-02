import db from "../db/bikes.json"
import { writeFileSync } from "jsonfile"

abstract class BikeModel {
    static readAllBikes = () => {
        const mappedData = db.bikes.map((bike) => {
            const { type, model, colour, priceHour } = bike
            return {
                type,
                model,
                colour, 
                priceHour
            }
        })
        return mappedData
    }

    static readBikeById = (id: string) => {
        const data = db.bikes.find((bike) => bike.id === id);

        if(data) {
            const { type, model, colour, priceHour } = data;
            return { type, model, colour, priceHour }
        }

        return data
    }

    static createBike = (objBike:any) => {
        const { id, type, model, colour, priceHour, quantity } = objBike;
        const newBike = { id, type, model, colour, priceHour, quantity}
    
        const bike = db.bikes.find((bike) => bike.id === id);

        if(bike) return 409;
        db.bikes.push(newBike)
        writeFileSync("./src/db/bikes.json", db)
    }

    static deleteBike = (id: string) => {
        const bike = db.bikes.find((bike) => bike.id === id);

        if(!bike) return 404;

        const deletedBike = db.bikes.filter((bike) => bike.id !== id);

        db.bikes = deletedBike;

        writeFileSync("./src/db/bikes.json", db)
    }

    static updateBike = (objData: any) => {
        const { id, type, model, colour, priceHour, quantity } = objData;

        const bike = db.bikes.find((bike) => bike.id === id);

        if(!bike) return 404

        if(type) bike.type = type
        if(model) bike.model = model
        if(colour) bike.colour = colour
        if(priceHour) bike.priceHour = priceHour
        if(quantity) bike.quantity = quantity

        writeFileSync("./src/db/bikes.json", db)
    }
    
}

export default BikeModel