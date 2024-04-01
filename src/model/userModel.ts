import db from "../db/bikes.json";
import {writeFile} from "jsonfile"

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
}

export default UserModel