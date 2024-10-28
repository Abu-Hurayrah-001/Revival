// IMPORTS
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

// USER MODEL
interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
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

// HASHING THE PASSWORD BEFORE SAVING THE USER
userSchema.pre<IUser>("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// COMPARING HASHED PASSWORD WITH PROVIDED PASSWORD
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>("User", userSchema);