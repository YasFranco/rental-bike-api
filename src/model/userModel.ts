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

    static readUserByEmail = (email: any) => {
        const data = db.users.find((user) => user.email === email);

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

        const user = db.users.find((user) => user.username.toLowerCase() === username.toLowerCase());

        if(!user) return 404
        if(user.password !== password) return 400

        const token = randomUUID()
        user.token = token

        writeFileSync("./src/db/bikes.json", db)
    }

    static updateUser = (objData:any) => {
        const { username, email, password, phone } = objData;

        const user = db.users.find((user) => user.username.toLowerCase() === username.toLowerCase());

        if(!user) return {error: "USER_NOT_FOUND"}
         
        if(username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = password;
        if(phone) user.phone = phone;

        writeFileSync("./src/db/bikes.json", db)

        return {message: "SUCCESSFULLY_MODIFIED_USER"}
    }

    static deleteUser = (username:any) => {
        const user = db.users.find((user) => user.username.toLowerCase() === username.toLowerCase());

        if(!user) return 404;

        const deletedUser = db.users.filter((user) => user.username.toLowerCase() !== username.toLowerCase());

        db.users = deletedUser;

        writeFileSync("./src/db/bikes.json", db);
    }

    static logoutUser = (username:any) => {
        const usernameLowerCase = username.toLowerCase()
        const user = db.users.find((user) => user.username.toLowerCase() === usernameLowerCase);
        console.log(user)

        if(!user) return { error: "USER_NOT_FOUND"}

        user.token = "";

        writeFileSync("./src/db/bikes.json", db)

        return {message: "LOGGED_OUT_USER"}

    }
}

export default UserModel