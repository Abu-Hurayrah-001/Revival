// IMPORTS
import mongoose from "mongoose";
import CustomError from "../middlewares/error_handling/customError.middleware";

// CONSTS. AND VARS.
let retries: number = 5;
const delay: number = 5000;

// CONNECT WITH DB
const connectDB = async(): Promise<void> => {
    while (retries >= 0) {
        // try-block
        try {
            await mongoose.connect(process.env.MONGO_URI as string);
            console.log("YAY!! YAY!! MongoDB successfully connected");
            return;
        // catch-block
        } catch (error: any) {
            console.error(`Error connecting to MongoDB: ${error.message}`);
    
            if (retries === 0) {
                throw new CustomError("Failed to connect to MongoDB after multiple attempts", 500);
                process.exit(1);
            } else {
                console.log(`Retrying connection... Attempls left: ${retries}`);
                await new Promise(res => setTimeout(res, delay)); // delays-the-while-loop-for-5-seconds
            }

            retries -= 1;
        };
    };
};

export default connectDB;