//IMPORTS
import rateLimit from "express-rate-limit";

//SETTING-UP-CONFIG-FOR-RATE-LIMIT
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "With great number of requests, comes a 15 minute ban!!",
    legacyHeaders: false,
});