// IMPORTS
import express from "express";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { corsConfig } from "../config/cors.config";
import { sessionConfig } from "../config/session.config";
import { sessionRefresher } from "../utils/sessionRefresher";
import { rateLimiterConfig } from "../config/rateLimiter.config";
import passport from "passport";
import errorHandler from "./error_handling/erroHandler.middleware";

// MIDDLEWARES
export const middlewares = [
    cors(corsConfig),
    helmet(),
    express.json(),
    session(sessionConfig),
    sessionRefresher,
    rateLimit(rateLimiterConfig),
    passport.initialize(),
    passport.session(),
    errorHandler,
];