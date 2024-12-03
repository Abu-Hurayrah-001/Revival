// IMPORTS
import express from "express";
import { handleGoogleOAuthCallback, handleGoogleOAuthLogin } from "../../../controllers/auth/oAuth/googleOAuth.controller";

// GOOGLE O-AUTH ROUTER
const googleOAuthRouter = express.Router();
googleOAuthRouter.get("/google", handleGoogleOAuthLogin);
googleOAuthRouter.get("/google/callback", handleGoogleOAuthCallback);

export default googleOAuthRouter;
