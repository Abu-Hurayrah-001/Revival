// IMPORTS
import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
import { initializePassport } from "./configs/passport/passportLocal.config";
import { initializeDiscordOAuthPassport } from "./configs/passport/passportDiscord.config";
import { initializeGoogleOAuthPassport } from "./configs/passport/passportGoogle.config";
import passport from "passport";
import { middlewares } from "./middlewares";
import { routes } from "./routes";

// INITIALIZING STUFF
dotenv.config();
initializePassport(passport);
initializeGoogleOAuthPassport(passport);
initializeDiscordOAuthPassport(passport);

// CONSTS. AND VARS.
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 8000;

//CONNECTING TO MONGO_DB
connectDB();

// MIDDLEWARES
app.use(...middlewares);
//TODO: Implement CSRF protection if I implemented cookies in auth

// ROUTES
app.use("/", routes.homeRouter);
app.use("/api/auth/sign-up", routes.signUpRouter);
app.use("/api/auth/sign-in", routes.signInRouter);
app.use("/api/auth/oauth", routes.googleOAuthRouter);
app.use("/api/auth/oauth", routes.discordOAuthRouter);
app.use("/api/auth/sign-out", routes.signOutRouter);
app.use("/api/courses/create-course", routes.createCourseRouter);
app.use("/api/courses/edit-course", routes.editCourseRouter);
app.use("/api/courses/delete-course", routes.deleteCourseRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("One simply does not hit the backend-route on accident!!");
    return;
});

// STARTING THE SERVER
app.listen(PORT, () => {
    console.log("YAY!! Server is up and running");
});