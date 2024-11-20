// IMPORTS
import { Request, Response, NextFunction } from "express";
import { IUser } from "../../models/user/user.model";

// VERIFY ADMIN ROLE
export const ensureAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as IUser;

    if (!user.isAdmin) {
        res.status(403).json({
            success: false,
            message: "Admins only feature. Go home, dear!!",
        });

        return;
    };

    next();
};