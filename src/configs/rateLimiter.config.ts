//CONFIG FOR RATE LIMIT
export const rateLimiterConfig: any = { // "any" type because "Options" is complex
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "With great number of requests, comes a 15 minute ban!!",
    legacyHeaders: false,
};