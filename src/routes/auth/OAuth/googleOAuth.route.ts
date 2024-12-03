// IMPORTS
import express from "express";
import { googleOAuthCallback, googleOAuthLogin } from "../../../controllers/auth/oAuth/googleOAuth.controller";

// GOOGLE O-AUTH ROUTER
const googleOAuthRouter = express.Router();
googleOAuthRouter.get("/google", googleOAuthLogin);
googleOAuthRouter.get("/google/callback", googleOAuthCallback);

export default googleOAuthRouter;
