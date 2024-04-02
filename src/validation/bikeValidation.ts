import zod from "zod";

const BikeEchema = zod.object({
    type: zod.string(),
    model: zod.string(),
    colour: zod.array(zod.string()),
    priceHour: zod.number().int().min(500),
    quantity: zod.number().int().min(1).max(10)
})

const validateBike = (objBike:any ) => BikeEchema.safeParse(objBike);

const validateParcialBike = (objBike:any) => BikeEchema.partial().safeParse(objBike)
    

export { validateBike,validateParcialBike }