// IMPORTS
import express, { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated.middleware";
import { ensureAdmin } from "../../middlewares/roles/ensureAdmin.middleware";
import { handleCourseEdit } from "../../controllers/courses/editCourse.controller";

// CREATE COURSE
const editCourseRouter: Router = express.Router();
editCourseRouter.post("/:courseId", ensureAuthenticated, ensureAdmin, handleCourseEdit);

export default editCourseRouter;