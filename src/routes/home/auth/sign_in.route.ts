// IMPORTS
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";

// SIGN-IN ROUTER
const signInRouter = express.Router();

signInRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error | null, user: Express.User, info: { message?: string }) => {
        if (err) {
            return next(err);
        };

        if (!user) {
            return res.status(401).json({
                success: false,
                message: info?.message || "Authentication failed!! Aww, don't cry?"
            });
        };
    });
});