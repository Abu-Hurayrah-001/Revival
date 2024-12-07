// IMPORTS
import express, { Request, Response } from "express";
import passport from "passport";

// INITIATE GOOGLE OAUTH LOGIN
export const handleGoogleOAuthLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// CALLBACK HANDLER AFTER GOOGLE REDIRECTS
export const handleGoogleOAuthCallback = (req: Request, res: Response) => {
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