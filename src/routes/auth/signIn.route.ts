// IMPORTS
import express from "express";
import { handleSignIn } from "../../controllers/auth/credentials/signIn.controller";

// SIGN-IN
const signInRouter = express.Router();
signInRouter.post("/", handleSignIn);

export default signInRouter;