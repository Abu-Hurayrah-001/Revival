// IMPORTS
import express, { Request, Response, NextFunction } from "express";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated.middleware";
import { ensureAdmin } from "../../middlewares/roles/ensureAdmin.middleware";
import { handleCourseCreation } from "../../controllers/courses/createCourse.controller";

// CREATE COURSE
const createCourseRouter = express.Router();
createCourseRouter.post("/", ensureAuthenticated, ensureAdmin, handleCourseCreation);

export default createCourseRouter;