// IMPORTS
import express, { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/auth/ensureAuthenticated.middleware";
import { ensureAdmin } from "../../middlewares/roles/ensureAdmin.middleware";
import { handleCourseDeletion } from "../../controllers/courses/deleteCourse.controller";

// DELETE COURSE
const deleteCourseRouter: Router = express.Router();
deleteCourseRouter.delete("/:courseId", ensureAuthenticated, ensureAdmin, handleCourseDeletion);

export default deleteCourseRouter;