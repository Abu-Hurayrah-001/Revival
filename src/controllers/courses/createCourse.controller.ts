// IMPORTS
import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import Course, { ICourse } from "../../models/course/course.model";
import cloudinary from "../../configs/cloudinary.config";

// COURSE CREATION CONTROLLER
export const handleCourseCreation = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, batchIncludes, description, thumbnail, introVideoUrl, forWhom, classes = [], FAQ = [], originalPrice, discountedPrice, category = [], feedbacks = [], studentIDs = [] } = req.body as any;

    if (!title || !batchIncludes || !description || !thumbnail || !introVideoUrl || !forWhom || !classes || !FAQ || !originalPrice || !category) {
        res.status(400).json({
            success: false,
            message: "Insufficient data, my man!!",
        });

        return;
    };

    let thumbnailUrl: string = "";
    
    const uploadedThumbnail: any = await cloudinary.uploader.upload(thumbnail, {
        folder: "courses/thumbnails",
        transformation: [{
            width: 400,
            height: 400,
            crop: "fill",
        }],
    });

    thumbnailUrl = uploadedThumbnail.secure_url;

    const course: ICourse = new Course({
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
    });

    const courseCopy: ICourse = await course.save();

    res.status(201).json({
        success: true,
        message: "Course created successfully, yahoo!!",
        course: courseCopy,
    });

    return;
});