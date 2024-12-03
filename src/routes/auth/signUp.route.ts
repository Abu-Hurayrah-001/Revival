//IMPORTS
import express, { Request, Response, NextFunction } from "express";
import User from "../../models/user/user.model";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import { handleSignUp } from "../../controllers/auth/credentials/signUp.controller";

//SIGN_UP ROUTE
const signUpRouter = express.Router();
signUpRouter.post("/", handleSignUp);

export default signUpRouter;