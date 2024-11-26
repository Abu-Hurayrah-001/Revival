// IMPORTS
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy } from "passport-discord";
import User, { IUser} from "../models/user/user.model";
import bcrypt from "bcryptjs";

// STERILIZE AND DESTERILIZE USER
passport.serializeUser((user, done) => {
    done(null, (user as IUser)._id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user || null);

    } catch (error: any) {
        done(error);       
    };
});

const generateRandomHashedPassword = async() => {
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    return hashedPassword;
};

// GOOGLE O-AUTH STRATEGY
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: "/api/auth/google/callback",
    },
    async(accessToken, refreshToken, profile, done) => {
        // try-part
        try {
            const email = profile.emails?.[0]?.value;

            if (!email) {
                done(null, false, { message: "Google account has no such email associated!!" });
                return;
            };

            let user = await User.findOne({ email });

            if (user) {
                if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                };
            } else {
                const hashedPassword = await generateRandomHashedPassword();

                user = await User.create({
                    username: profile.displayName || "Google User",
                    email,
                    password: hashedPassword,
                    googleId: profile.id,
                });
                // TODO: SEND THE PASSWORD TO USER VIA EMAIL
            };

            done(null, user);
            return;
        // catch-part
        } catch (error: any) {
            done(error);
            return;
        };
    },
));

// DISCORD O-AUTH STRATEGY
passport.use(new DiscordStrategy(
    {
        clientID: process.env.DISCORD_CLIENT_ID || "",
        clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
        callbackURL: "/api/auth/discord/callback",
    },
    async(accessToken, refreshToken, profile, done) => {
        // try-part
        try {
            const email = profile.email;

            if (!email) {
                done(null, false, { message: "Discord account has no such email associated!!" });
                return;
            };

            let user = await User.findOne({ email });

            if (user) {
                if (!user.discordId) {
                    user.discordId = profile.id;
                    await user.save();
                };
            } else {
                const hashedPassword = await generateRandomHashedPassword();

                user = await User.create({
                    username: profile.username || "Discord User",
                    email,
                    password: hashedPassword,
                    discordId: profile.id,
                });
                // TODO: SEND THE PASSWORD TO USER VIA EMAIL
            };

            done(null, user);
            return;
        // catch-part
        } catch (error: any) {
            done(error);
            return;
        };
    },
));