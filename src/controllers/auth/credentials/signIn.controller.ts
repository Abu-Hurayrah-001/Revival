// IMPORTS
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUser } from "../../../models/user/user.model";

// SIGN-IN CONTROLLER
export const handleSignIn = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Credential(s) missing, Genius!!"
        });

        return;
    };

    passport.authenticate("local", (err: Error | null, user: IUser, info: { message?: string }) => {
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
                next(logInError);
                return;
            };

            const userObject = user.toObject(); // converting-mongoose-document-to-plain-object-for-bug-free-modification
            delete userObject.password;

            res.status(200).json({
                success: true,
                message: "Welcome home, Dear!!",
                user: userObject,
            });

            return;
        });
    }) (req, res, next);
};