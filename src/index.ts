import express from "express"
import dotenv from "dotenv";
dotenv.config();
import { info} from "./db/bikes.json";
import userRouter from "./routes/userRouter";


const app = express(); 

const PORT = process.env.PORT;
app.use(express.json());

app.get("/api", (req, res) => {
    res.json(info)
} )

app.use("/api/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server listening on PORT: http://localhost:${PORT}`)
})