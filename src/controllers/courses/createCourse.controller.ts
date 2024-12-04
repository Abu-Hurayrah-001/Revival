// IMPORTS
import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import Course from "../../models/course/course.model";

// COURSE CREATION CONTROLLER
export const handleCourseCreation = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, description, modules, categories = [], studentIDs = [] } = req.body;

    if (!title || !description || !modules) {
        res.status(400).json({
            success: false,
            message: "At least one of the following is missing, my man : 'Title', 'Description' or 'Modules'"
        });

        return;
    };

    const course = new Course({
        title,
        description,
        modules,
        categories,
        studentIDs,
    });

    const courseCopy = await course.save();

    res.status(201).json({
        success: true,
        message: "Course created successfully, yahoo!!",
        course: courseCopy,
    });

    return;
})