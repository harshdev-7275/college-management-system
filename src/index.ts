import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes"
const app = express()

app.use(express.json())


const port = process.env.PORT || 5000


app.use(cors())

app.use("/api/v1/", adminRoutes)
app.use("/api/v1/", userRoutes)



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})