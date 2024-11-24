// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface ICourseCard extends Document {
    title: string;
    thumbnailUrl?: string;
    forWhom: string;
    startsOn: string;
    endsOn: string;
    originalPrice: number;
    discountedPrice?: number;
};

export interface ICourseDescription extends Document {
    title: string;
    
};

// SCHEMAS
const courseCardSchema = new Schema<ICourseCard>({
    title: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: false, 
    },
    forWhom: {
        type: String,
        required: true,
    },
    startsOn: {
        type: String,
        required: true,
    },
    endsOn: {
        type: String,
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
});

const courseDescriptionSchema = new Schema<ICourseDescription>({
    
}, { timestamps: true });

//EXPORT
export default mongoose.model<ICourse>("Course", courseSchema);