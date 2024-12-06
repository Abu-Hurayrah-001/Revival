// IMPORTS
import passport, { PassportStatic } from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import User, { IUser} from "../../models/user/user.model";
import bcrypt from "bcryptjs";

// DISCORD O-AUTH STRATEGY
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

const generateRandomHashedPassword = async(): Promise<string> => {
    const randomPassword: string = Math.random().toString(36).slice(-8);
    const hashedPassword: string = await bcrypt.hash(randomPassword, 10);
    return hashedPassword;
};

export const initializeDiscordOAuthPassport = (passport: PassportStatic) => {
    passport.use(new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID || "",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
            callbackURL: `${process.env.FRONTEND_URL}/api/auth/discord/callback`,
        },
        async(accessToken, refreshToken, profile, done) => {
            // try-part
            try {
                const email: string | undefined = profile.email;
    
                if (!email) {
                    done(null, false, { message: "Discord account has no such email associated!!" });
                    return;
                };
    
                let user: IUser | null = await User.findOne({ email });
    
                if (user) {
                    if (!user.discordId) {
                        user.discordId = profile.id;
                        await user.save();
                    };
                } else {
                    const hashedPassword: string = await generateRandomHashedPassword();
    
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
};