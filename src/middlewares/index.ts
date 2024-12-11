// IMPORTS
import express, { ErrorRequestHandler, RequestHandler } from "express";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { corsConfig } from "../configs/cors.config";
import { sessionConfig } from "../configs/session.config";
import { sessionRefresher } from "../utils/sessionRefresher";
import { rateLimiterConfig } from "../configs/rateLimiter.config";
import passport from "passport";
import errorHandler from "./error_handling/erroHandler.middleware";

// MIDDLEWARES
export const middlewares: Array<RequestHandler | ErrorRequestHandler> = [
    cors(corsConfig),
    helmet(),
    express.json({ limit: "10mb" }),
    session(sessionConfig),
    sessionRefresher,
    rateLimit(rateLimiterConfig),
    passport.initialize(),
    passport.session(),
    errorHandler,
];