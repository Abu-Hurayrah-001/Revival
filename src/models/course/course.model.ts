// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IClass {
    title: string;
    description: string;
    videoUrl?: string; // because-sometimes-a-teacher-might-just-want-to-upload-notes
    resourceUrls?: Array<string>;
};

export interface ICourse extends Document {
    title: string;
    description: string;
    thumbnailUrl?: string;
    classes: IClass[];
    categories?: Array<string>;
    studentIDs?: Array<string>;
};

// SCHEMAS
const classSchema = new Schema<IClass>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: false,
    },
    resourceUrls: {
        type: [String],
        default: [],
        required: false,
    },
}, { timestamps: true });

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: false,
    },
    classes: {
        type: [classSchema],
        default: [],
        required: true,
    },
    categories: {
        type: [String],
        default: [],
        required: false,
    },
    studentIDs: {
        type: [String],
        default: [],
        required: false,
    },
}, { timestamps: true });

//EXPORT
export default mongoose.model<ICourse>("Course", courseSchema);