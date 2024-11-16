// IMPORTS
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

// USER MODEL
export interface IUser extends Document {
    email: string;
    password: string;
    isTeacher?: boolean;
    isAdmin?: boolean;
    isMentor?: boolean;
    courseIds?: Array<string>;
    comparePassword(password: string): Promise<boolean>;
};

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isTeacher: {
        type: Boolean,
        required:false,
        default: false,        
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },
    isMentor: {
        type: Boolean,
        required: false,
        default: false,
    },
    courseIds: {
        type: [String],
        required: false,
        default: [],
    },
}, { timestamps: true });

// HASHING THE PASSWORD BEFORE SAVING THE USER
userSchema.pre<IUser>("save", async function(next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    };

    //try-block
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    //catch-block
    } catch (error: any) {
        next(error);
    };
});

//PASSWORD COMPARISON METHOD
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    //try-block
    try {
        return await bcrypt.compare(password, this.password);
    //catch-block
    } catch (error: any) {
        console.error("Error comparing password: ", error);
        return false;
    };
};

export default mongoose.model<IUser>("User", userSchema);