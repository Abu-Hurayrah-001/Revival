// IMPORTS
import express, { Router } from "express";
import { handleGoogleOAuthCallback, handleGoogleOAuthLogin } from "../../../controllers/auth/oAuth/googleOAuth.controller";

// GOOGLE O-AUTH ROUTER
const googleOAuthRouter: Router = express.Router();
googleOAuthRouter.get("/google", handleGoogleOAuthLogin);
googleOAuthRouter.get("/google/callback", handleGoogleOAuthCallback);

export default googleOAuthRouter;
