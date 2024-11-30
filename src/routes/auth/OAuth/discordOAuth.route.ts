// IMPORTS
import express from "express";
import passport from "passport";

// DISCORD O-AUTH

const discordOAuthRouter = express.Router();
discordOAuthRouter.get("/", passport.authenticate("discord", { scope: ["identify", "email"] }));

export default discordOAuthRouter;