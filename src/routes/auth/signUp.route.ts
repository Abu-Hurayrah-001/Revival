//IMPORTS
import express, { Request, Response, NextFunction } from "express";
import User from "../../models/user/user.model";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";

//SIGN_UP ROUTE
const signUpRouter = express.Router();

signUpRouter.post(
    "/",
    asyncErrorHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!username) {
            res.status(400).json({
                success: false,
                message: "Username is missing, Champ!!"
            });

            return;
        };
        
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Credential(s) missing, Champ!!"
            });

            return;
        };

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists, Gonna Cry?",
            });

            return;
        };

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            success: true,
            message: "And so, it begins...",
        });
        
        return;
    }),
);

export default signUpRouter;