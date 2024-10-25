// IMPORTS
import { Request, Response, NextFunction } from "express";

// GENERAL ERROR HANDING MIDDLEWARE
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export default errorHandler;