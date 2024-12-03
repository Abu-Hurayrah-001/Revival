// IMPORTS
import { Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// INITIATE DISCORD OAUTH LOGIN
export const handleDiscordOAuthLogin = passport.authenticate("discord", { scope: ["identify", "email"] });

// CALLBACK HANDLER AFTER discord REDIRECTS
export const handleDiscordOAuthCallback = (req: Request, res: Response) => {
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
};