// IMPORTS
import { NextFunction, Request, Response } from "express";
import asyncErrorHandler from "../../middlewares/error_handling/asyncErrorHandler.middelware";
import Course, { ICourse } from "../../models/course/course.model";
import cloudinary from "../../configs/cloudinary.config";

// COURSE EDIT CONTROLLER

export const handleCourseEdit = asyncErrorHandler(async(req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params as any;
    const { title, batchIncludes, description, thumbnailUrl, thumbnail, introVideoUrl, forWhom, classes, FAQ, originalPrice, discountedPrice, category, feedbacks, studentIDs } = req.body as any;
    const courseData: ICourse | null = await Course.findById(courseId);

    if (!courseData) {
        res.status(404).json({
            success: false,
            message: "Course not found? Aww, don't cry!!",
        });

        return;
    };

    if (!title || !batchIncludes || !description || !thumbnailUrl || !introVideoUrl || !forWhom || !classes || !FAQ || !originalPrice || !category) {
        res.status(400).json({
            success: false,
            message: "Insufficient data, my man!!",
        });

        return;
    };

    let finalThumbnailUrl: string = thumbnailUrl;

    //thumbnail-contains-base-64-image-so-if-you-get-thumbnail-data-then-it-means-that-the-user-has-tried-to-update-it
    if (thumbnail) {
        const uploadedThumbnail: any = await cloudinary.uploader.upload(thumbnail, {
            folder: "courses/thumbnails",
            transformation: [{
                width: 400,
                height: 400,
                crop: "fill",
            }],
        });

        finalThumbnailUrl = uploadedThumbnail.secure_url;
    }

    const updatedCourseData = {
        title,
        batchIncludes,
        description,
        thumbnailUrl: finalThumbnailUrl,
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

    const updatedCourseCopy = await Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true });

    res.status(200).json({
        success: true,
        message: "Course updated successfully, great job!!",
        course: updatedCourseCopy,
    });
});