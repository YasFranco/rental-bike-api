import express from "express"
import dotenv from "dotenv";
dotenv.config();
import { info} from "./db/bikes.json";


const app = express(); 

const PORT = process.env.PORT;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on PORT: http://localhost:${PORT}`)
})