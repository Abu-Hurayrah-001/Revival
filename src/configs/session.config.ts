//IMPORTS
import dotenv from "dotenv";
import { SessionOptions } from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

//LOADING THE ENV
dotenv.config(); // do-not-remove-it-or-the-auth-will-break(Yes,-I-know-that-it-has-already-been-loaded-in-server.ts)

//Express Session Conig
export const sessionConfig: SessionOptions = {
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "development" ? false : true,
        maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60, // 14-days
    }),
};