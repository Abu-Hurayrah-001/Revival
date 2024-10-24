//IMPORTS
import rateLimit from "express-rate-limit";

//SETTING-UP-CONFIG-FOR-RATE-LIMIT
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this I.P. (Kindly come back after 15 minutes)",
    legacyHeaders: false,
});