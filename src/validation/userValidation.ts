import zod from "zod";

const UserEchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(4),
    phone: zod.number().int()
})

const validateUser = (objUser:any ) => UserEchema.safeParse(objUser);

const validateParcialUser = (objUser:any) => UserEchema.partial().safeParse(objUser)
    

export { validateUser,validateParcialUser }