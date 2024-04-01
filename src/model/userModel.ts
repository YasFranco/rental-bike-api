import db from "../db/bikes.json";

abstract class UserModel {
    static readUsers = () => {
        return db.users
    }
}

export default UserModel