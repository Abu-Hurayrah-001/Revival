// IMPORTS
import express, { Request, Response, NextFunction } from "express";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated.middleware";

//SIGN OUT
const signOutRouter = express.Router();

signOutRouter.post(
    "/",
    ensureAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
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
    },
);

export default signOutRouter;