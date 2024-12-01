// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IClasses extends Document {
    subject: string;
    chapter: string;
    videoUrl: string;
    resourceUrls?: [string];
};

export interface IFAQ extends Document {
    question: string;
    answer: string;
};

export interface ICourse extends Document {
    title: string;
    batchIncludes: string;
    description: string;
    FAQ: [IFAQ]
    thumbnailUrl: string;
    introVideoUrl: string;
    forWhom: string;
    originalPrice: number;
    discountedPrice?: number;
    classes: [IClasses];
    feedbacks?: [string];
};

// SCHEMAS
const classesSchema = new Schema<IClasses>({
    subject: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    resourceUrls: {
        type: [String],
        required: false,
    },
});

const FAQSchema = new Schema<IFAQ>({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
    },
    batchIncludes: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true, 
    },
    introVideoUrl: {
        type: String,
        required: true, 
    },
    forWhom: {
        type: String,
        required: true,
    },
    classes: {
        type: [classesSchema],
        required: true,
    },
    FAQ: {
        type: [FAQSchema],
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: false,
    },
    feedbacks: {
        type: [String],
        required: false,
    },
});

//EXPORT
export default mongoose.model<ICourse>("Course", courseSchema);