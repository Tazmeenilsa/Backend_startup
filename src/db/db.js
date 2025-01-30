import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// keep in mind  db is in another continent, so use async await
const connectDb = async () => {
    console.log(process.env.MONGODB_URI)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB HOST : ${connectionInstance.connection.host}`)

    } catch (error) {
        console.error("Mongodb conection failed", error)
        // process???   predefined node method.
        // The process object provides information about, and control over, the current Node.js process.
        process.exit(1)
    }
}

export default connectDb
