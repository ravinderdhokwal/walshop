import mongoose from "mongoose";
import { APP_NAME } from "../constants.js";

const DATABASE_URI: string = process.env.DATABASE_URI as string;

export const connectDB = async () => {
    try {
        mongoose.connect(`${DATABASE_URI}/${APP_NAME}`)
    } catch (error) {
        console.log("!!! DATABASE CONNECTION ERROR !!!");
        console.log(error);
        process.exit(1);
    }
}