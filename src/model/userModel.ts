import db from "../db/bikes.json";
import { writeFileSync } from "jsonfile"
import { randomUUID } from "node:crypto"

abstract class UserModel {
    static readUsers = () => {
        const mappedData = db.users.map((user) => {
            const { username, email} = user
            return {
                username,
                email
            }
        })
        return mappedData
    }

    static readUserById = (username: any) => {
        const data = db.users.find((user) => user.username === username);

        if(data) {
            const { username, email} = data;
            return { username, email}
        }

        return data
    }

    static createUser = (objUser: any) => {
        const { username, email, password, phone} = objUser

        const newUser = { username, email, password, phone, token: "" };
        const user = db.users.find((user) => user.username === username);

        if(user) return 409;
        db.users.push(newUser)
        writeFileSync("./src/db/bikes.json", db)
    }

    static loginUser = (dataUser:any) => {
        const { username, password } = dataUser;

        const user = db.users.find((user) => user.username === username);

        if(!user) return 404
        if(!password) return 400
        if(user.password !== password) return 400

        const token = randomUUID()
        user.token = token

        writeFileSync("./src/db/bikes.json", db)
    }
}

export default UserModel