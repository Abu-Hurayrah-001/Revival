// IMPORTS
import express from "express";
import { discordOAuthCallback, discordOAuthLogin } from "../../../controllers/auth/oAuth/discordOAuth.controller";

// DISCORD O-AUTH ROUTER
const discordOAuthRouter = express.Router();
discordOAuthRouter.get("/discord", discordOAuthLogin);
discordOAuthRouter.get("/discord/callback", discordOAuthCallback);

export default discordOAuthRouter;
