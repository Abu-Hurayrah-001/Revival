// IMPORTS
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy } from "passport-discord";
import User, { IUser} from "../models/user/user.model";

// STERILIZE AND DESTERILIZE USER
passport.serializeUser((user, done) => {
    done(null, (user as IUser)._id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
    } catch (error: any) {
        done(error);       
    };
});

// GOOGLE O-AUTH STRATEGY
