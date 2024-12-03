// IMPORTS
import { NextFunction, Request, Response } from "express";

// SIGN-OUT CONTROLLER
export const handleSignOut = (req: Request, res: Response, next: NextFunction) => {
    req.logOut((err: any) => {
        if (err) {
            next(err);
            return;
        };
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully!!",
    });
};