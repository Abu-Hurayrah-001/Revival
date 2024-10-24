// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// USER MODEL
interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true});

// TODO: Implement password hasing

export default mongoose.model<IUser>("User", userSchema);