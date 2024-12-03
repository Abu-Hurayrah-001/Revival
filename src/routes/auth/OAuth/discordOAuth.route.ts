// IMPORTS
import express from "express";
import { handleDiscordOAuthCallback, handleDiscordOAuthLogin } from "../../../controllers/auth/oAuth/discordOAuth.controller";

// DISCORD O-AUTH ROUTER
const discordOAuthRouter = express.Router();
discordOAuthRouter.get("/discord", handleDiscordOAuthLogin);
discordOAuthRouter.get("/discord/callback", handleDiscordOAuthCallback);

export default discordOAuthRouter;
