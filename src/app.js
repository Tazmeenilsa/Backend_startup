import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
// cookie parser => get access the cookies and set the cookies of user browser from my server
// secure cookies ko user k browser m rkhna jisko sirf server hi read kr skta hy or wohi remove kr skta hy

const app = express()
// app.use methid is for middlewares or any configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// routes import 
import userRouter from './routes/user.route.js'

// routes declaration
app.use("/api/v1/users", userRouter)

export { app }