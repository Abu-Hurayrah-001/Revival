// IMPORTS
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { rateLimiter } from "./utils/rateLimiter";
import helmet from "helmet";
import homeRouter from "./routes/home.route";
import connectDB from "./utils/db";

// lOADING THE .ENV FILE
dotenv.config();

// CONSTS. AND VARS.
const app = express();
const PORT: number = Number(process.env.PORT) || 8000;

const corsConfiguration: CorsOptions = {
    origin: process.env.Frontend_Domain,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

//CONNECTING TO MONGO_DB
connectDB();

// MIDDLEWARES
app.use(cors(corsConfiguration));
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
//TODO: Implement CSRF protection if I implemented cookies in auth

// ROUTES
app.use("/", homeRouter);

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log("YAY!! Server is up and running");
});