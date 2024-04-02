import express from "express"
import morgan from "morgan"
import dotenv from "dotenv";
dotenv.config();
import { info} from "./db/bikes.json";
import userRouter from "./routes/userRouter";
import bikeRouter from "./routes/bikeRouter";


const app = express(); 

const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"))

app.get("/api", (req, res) => {
    res.json(info)
} )

app.use("/api/users", userRouter)
app.use("/api/bikes", bikeRouter)

app.use("*", (req, res) => {
    res.status(404).json({ error: "Resourse not found"})
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT: http://localhost:${PORT}`)
})