// IMPORTS
import { Request, Response, NextFunction } from "express";

// CHECK IF PREVIOUSLY AUTHENTICATED
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    };

    res.status(401).json({
        success: false,
        message: "You're not logged in buddy!!",
    });
};