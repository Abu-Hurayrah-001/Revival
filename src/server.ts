// IMPORTS
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { rateLimiter } from "./utils/rateLimiter";
import helmet from "helmet";
import homeRouter from "./routes/home/home.route";
import connectDB from "./utils/db";
import errorHandler from "./middlewares/error_handling/erroHandler.middleware";
import signUpRouter from "./routes/home/auth/sign_up.route";
import signInRouter from "./routes/home/auth/sign_in.route";
import { initializePassport } from "./config/passportConfig";
import passport from "passport";

// INITIALIZING STUFF
dotenv.config();
initializePassport(passport);

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
app.use(passport.initialize());
app.use(errorHandler);
//TODO: Implement CSRF protection if I implemented cookies in auth

// ROUTES
app.use("/", homeRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/sign-in", signInRouter);

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log("YAY!! Server is up and running");
});