// IMPORTS
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// SIGN-IN ROUTER
const signInRouter = express.Router();

signInRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Credential(s) missing"
        });

        return;
    };

    passport.authenticate("local", (err: Error | null, user: Express.User, info: { message?: string }) => {
        if (err) {
            next(err);
            return;
        };

        if (!user) {
            res.status(401).json({
                success: false,
                message: info?.message || "Authentication failed? Aww, don't cry"
            });

            return;
        };

        req.logIn(user, (logInError: Error | null) => {
            if (logInError) {
                return next(logInError);
            };

            res.status(200).json({
                success: true,
                message: "Signed in successfully",
                user: {
                    id: (user as IUser)._id,
                    email: (user as IUser).email,
                },
            });

            return;
        });
    }) (req, res, next);
});

export default signInRouter;