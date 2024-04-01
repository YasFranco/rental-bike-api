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
}

export default UserModel