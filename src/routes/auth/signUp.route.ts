//IMPORTS
import express, { Request, Response, NextFunction, Router } from "express";
import { handleSignUp } from "../../controllers/auth/credentials/signUp.controller";

//SIGN_UP ROUTE
const signUpRouter: Router = express.Router();
signUpRouter.post("/", handleSignUp);

export default signUpRouter;