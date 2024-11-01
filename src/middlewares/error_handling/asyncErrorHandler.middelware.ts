// IMPORTS
import { Request, Response, NextFunction, RequestHandler } from "express"

// ASYNC ERROR HANDLING MIDDLEWARE
const asyncErrorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

export default asyncErrorHandler;