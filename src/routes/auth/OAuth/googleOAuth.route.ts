// IMPORTS
import express from "express";
import passport from "passport";

// GOOGLE O-AUTH
const googleOAuthRouter = express.Router();
googleOAuthRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

export default googleOAuthRouter;