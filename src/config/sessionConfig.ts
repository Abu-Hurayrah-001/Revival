//IMPORTS
import dotenv from "dotenv";

//LOADING THE ENV
dotenv.config(); // do-not-remove-it-or-the-auth-will-break(Yes,-I-know-that-it-has-already-been-loaded-in-server.ts)

//Express Session Conig
export const sessionConfig = {
    secret: process.env.SESSION_SECRET || "",
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "development" ? false : true,
        maxAge: 1000 * 60 * 60,
    },
};