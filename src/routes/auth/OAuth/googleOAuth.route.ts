// IMPORTS
import express from "express";
import passport from "passport";

// GOOGLE O-AUTH
const googleOAuthRouter = express.Router();
googleOAuthRouter.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

export default googleOAuthRouter;