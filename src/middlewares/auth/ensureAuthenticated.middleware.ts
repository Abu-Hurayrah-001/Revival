// IMPORTS
import { Request, Response, NextFunction } from "express";

// VERIFY IF PREVIOUSLY AUTHENTICATED
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
        return;
    };

    res.status(401).json({
        success: false,
        message: "You're not logged in, buddy!!",
    });
};