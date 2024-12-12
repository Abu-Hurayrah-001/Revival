// IMPORTS
import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import Course, { ICourse } from "../../models/course/course.model";

// COURSE DELETION CONTROLLER
export const handleCourseDeletion = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { courseId }: { courseId: string } = req.params as any;
    const courseData: ICourse | null = await Course.findById(courseId);

    if (!courseData) {
        res.status(404).json({
            success: false,
            message: "Oopsies!! Course not found.",
        });

        return;
    };

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
        success: true,
        message: "Course is Khallas!!",
    });
});