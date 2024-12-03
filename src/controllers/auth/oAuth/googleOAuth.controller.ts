// IMPORTS
import express, { Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// INITIATE GOOGLE OAUTH LOGIN
export const googleOAuthLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// CALLBACK HANDLER AFTER GOOGLE REDIRECTS
export const googleOAuthCallback = (req: Request, res: Response) => {
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