//IMPORTS
import express, { Request, Response, NextFunction } from "express";
import User from "../../../models/user/user.model";
import asyncErrorHandler from "../../../middlewares/error_handling/asyncErrorHandler.middelware";

//SIGN_UP ROUTE
const signUpRouter = express.Router();

signUpRouter.post("/", asyncErrorHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "Email or password or both are missing"
        });
    };

    if (existingUser) {
        res.status(400).json({
            success: false,
            message: "User already exists, Gonna Cry?",
        });
    };

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
        success: true,
        message: "And so, it begins...",
    });
}));

export default signUpRouter;