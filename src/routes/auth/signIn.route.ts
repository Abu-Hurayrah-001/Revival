// IMPORTS
import express, { Router } from "express";
import { handleSignIn } from "../../controllers/auth/credentials/signIn.controller";

// SIGN-IN
const signInRouter: Router = express.Router();
signInRouter.post("/", handleSignIn);

export default signInRouter;