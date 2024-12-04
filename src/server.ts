// IMPORTS
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import { initializePassport } from "./config/passport/passportLocal.config";
import { initializeDiscordOAuthPassport } from "./config/passport/passportDiscord.config";
import { initializeGoogleOAuthPassport } from "./config/passport/passportGoogle.config";
import passport from "passport";
import { middlewares } from "./middlewares";
import { routes } from "./routes";

// INITIALIZING STUFF
dotenv.config();
initializePassport(passport);
initializeGoogleOAuthPassport(passport);
initializeDiscordOAuthPassport(passport);

// CONSTS. AND VARS.
const app = express();
const PORT: number = Number(process.env.PORT) || 8000;

//CONNECTING TO MONGO_DB
connectDB();

// MIDDLEWARES
app.use(...middlewares);
//TODO: Implement CSRF protection if I implemented cookies in auth

// ROUTES
app.use("/", routes.homeRouter);
app.use("/api/sign-up", routes.signUpRouter);
app.use("/api/sign-in", routes.signInRouter);
app.use("/api/oauth", routes.googleOAuthRouter);
app.use("/api/oauth", routes.discordOAuthRouter);
app.use("/api/sign-out", routes.signOutRouter);
app.use("/api/create-course", routes.createCourseRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("One simply does not hit the backend-route on accident!!");
    return;
});

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log("YAY!! Server is up and running");
});