// IMPORTS
import express, { Router } from "express";
import { handleDiscordOAuthCallback, handleDiscordOAuthLogin } from "../../../controllers/auth/oAuth/discordOAuth.controller";

// DISCORD O-AUTH ROUTER
const discordOAuthRouter: Router = express.Router();
discordOAuthRouter.get("/discord", handleDiscordOAuthLogin);
discordOAuthRouter.get("/discord/callback", handleDiscordOAuthCallback);

export default discordOAuthRouter;
