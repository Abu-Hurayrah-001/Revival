// IMPORTS
import express, { Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// discord O-AUTH
interface AuthenticationRequest extends Request {
    user?: IUser;
};

const discordOAuthRouter = express.Router();
discordOAuthRouter.get("/discord", passport.authenticate("discord", { scope: ["identify", "email"] }));

discordOAuthRouter.get("/discord/callback", passport.authenticate("discord", { session: true }, (req: AuthenticationRequest, res: Response) => {
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

export default discordOAuthRouter;