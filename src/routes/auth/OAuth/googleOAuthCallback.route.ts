// IMPORTS
import express, { Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// GOOGLE O-AUTH CALLBACK
interface AuthenticationRequest extends Request {
    user?: IUser;
};

const googleOAuthCallbackRouter = express.Router();

googleOAuthCallbackRouter.get("/", passport.authenticate("google", { session: true }, (req: AuthenticationRequest, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Authentication successful",
            user: req.user,
        });
    } else {
        res.status(401).json({
            succcess: false,
            message: "Authentication failed or user data missing",
        });
    };
}));

export default googleOAuthCallbackRouter;