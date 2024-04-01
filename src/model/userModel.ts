import db from "../db/bikes.json";
import {writeFileSync} from "jsonfile"

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
}

export default UserModel