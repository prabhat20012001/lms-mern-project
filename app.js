import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"
import { config } from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
import errorMiddleware from "./middleware/error.middleware.js";

config();

const app=express()

app.use(express.json())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use(morgan('dev'))
app.use(cookieParser())

app.use('/ping',(req,res)=>{
    res.send('/pong')
})

app.use("/api/v1/user",userRoutes)


app.all("*",(req,res)=>{
    res.status(404).send('oops!404 page not found')
})

app.use(errorMiddleware )

export default app;
