// IMPORTS
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

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
        select: false,
    },
}, {timestamps: true});

// HASHING THE PASSWORD BEFORE SAVING THE USER
userSchema.pre<IUser>("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    //try-block
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    //catch-block
    } catch (error: any) {
        next(error)
    }
});

export default mongoose.model<IUser>("User", userSchema);