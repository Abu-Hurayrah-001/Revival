//IMPORTS
import { Request, Response, NextFunction } from "express";

//SESSION REFRESHER
export const sessionRefresher = (req: Request,res: Response, next: NextFunction): void => {
    if (req.session) {
        req.session.touch();
    };

    next();
};