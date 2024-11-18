// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IModule {
    title: string;
    description: string;
    videoUrl?: string; // because-sometimes-a-teacher-might-just-want-to-upload-notes
    resourceUrls?: Array<string>;
};

export interface ICourse extends Document {
    title: string;
    description: string;
    modules: IModule[];
    categories?: Array<string>;
    studentIDs?: Array<string>;
};

// SCHEMAS
const moduleSchema = new Schema<IModule>({
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
    modules: {
        type: [moduleSchema],
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