// IMPORTS
import homeRouter from "./home/home.route";
import signUpRouter from "./auth/signUp.route";
import signInRouter from "./auth/signIn.route";
import createCourseRouter from "./courses/createCourse.route";
import signOutRouter from "./auth/signOut.route";
import googleOAuthRouter from "./auth/OAuth/googleOAuth.route";
import discordOAuthRouter from "./auth/OAuth/discordOAuth.route";
import { Router } from "express";
import editCourseRouter from "./courses/editCourse.route";
import deleteCourseRouter from "./courses/deleteCourse.route";

// ROUTES
export const routes: Record<string, Router> = {
    homeRouter,
    signUpRouter,
    signInRouter,
    createCourseRouter,
    signOutRouter,
    googleOAuthRouter,
    discordOAuthRouter,
    editCourseRouter,
    deleteCourseRouter
};