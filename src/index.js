import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDb from "./db/db.js";
import { app } from "./app.js";

// 2:
// Second Approch
// make separate db folder
configDotenv({
    path: './.env'
})
connectDb().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at PORT : ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log('MONGODB connection failed', err)
})





// 1:
// First approach
// // use  or simple function  ,trycatch, use async await because db is in another continent

// import express from 'express';
// const app = express()
//     ; (async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             // Listeners
//             app.on('error', (error) => {
//                 console.log("ERRR", error)
//                 throw error
//             })
//             app.listen(process.env.PORT,()=>{
//                 console.log(`App is listening on PORT ${process.env.PORT}`)
//             })

//         } catch (error) {
//             console.error('ERROR', error)
//             throw error
//         }
//     })()