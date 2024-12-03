// IMPORTS
import express, { Request, Response, NextFunction } from "express";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated.middleware";
import { handleSignOut } from "../../controllers/auth/signOut.controller";

//SIGN OUT
const signOutRouter = express.Router();
signOutRouter.post("/", ensureAuthenticated, handleSignOut);

export default signOutRouter;