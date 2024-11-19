// IMPORTS
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimiterConfig } from "./config/rateLimiterConfig";
import helmet from "helmet";
import homeRouter from "./routes/home/home.route";
import connectDB from "./utils/connectDB";
import errorHandler from "./middlewares/error_handling/erroHandler.middleware";
import signUpRouter from "./routes/auth/signUp.route";
import signInRouter from "./routes/auth/signIn.route";
import { initializePassport } from "./config/passportConfig";
import passport from "passport";
import session from "express-session";
import rateLimit from "express-rate-limit";
import { sessionConfig } from "./config/sessionConfig";
import { sessionRefresher } from "./utils/sessionRefresher";
import { corsConfig } from "./config/corsConfig";
import createCourseRouter from "./routes/courses/createCourse.route";

// INITIALIZING STUFF
dotenv.config();
initializePassport(passport);

// CONSTS. AND VARS.
const app = express();
const PORT: number = Number(process.env.PORT) || 8000;

//CONNECTING TO MONGO_DB
connectDB();

// MIDDLEWARES
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(session(sessionConfig));
app.use(sessionRefresher);
app.use(rateLimit(rateLimiterConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
//TODO: Implement CSRF protection if I implemented cookies in auth

// ROUTES
app.use("/", homeRouter);
app.use("/api/sign-up", signUpRouter);
app.use("/api/sign-in", signInRouter);
app.use("/api/create-course", createCourseRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("One simply does not hit the backend-route on accident!!");
    return;
});

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log("YAY!! Server is up and running");
});