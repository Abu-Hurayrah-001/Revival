// IMPORTS
import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import Course, { ICourse } from "../../models/course/course.model";
import cloudinary from "../../configs/cloudinary.config";

// COURSE EDIT CONTROLLER

export const handleCourseEdit = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params as any;
    const { title, batchIncludes, description, thumbnail, introVideoUrl, forWhom, classes = [], FAQ = [], originalPrice, discountedPrice, category = [], feedbacks = [], studentIDs = [] } = req.body as any;
    const courseData: ICourse | null = await Course.findById(courseId);

    if (!courseData) {
        res.status(404).json({
            success: false,
            message: "Course not found? Aww, don't cry!!",
        });

        return;
    };

    const updatedCourseData = {
        title,
        batchIncludes,
        description,
        thumbnailUrl,
        introVideoUrl,
        forWhom,
        classes,
        FAQ,
        originalPrice,
        discountedPrice,
        category,
        feedbacks,
        studentIDs,
    };
});