//IMPORTS
import { Strategy as LoaclStrategy } from "passport-local";
import User, { IUser } from "../models/user/user.model";
import passport, { PassportStatic } from "passport";

//PASSPORT.JS CONFIGURATION
const localOptions = {
    usernameField: "email",
    passwordField: "password",
};

export const initializePassport = (passport: PassportStatic) => {
    passport.use(new LoaclStrategy(localOptions, async (email, password, done) => {
        // try-block
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "No user exists with that email!! (evil laughter intensifies...)" });
          };

          const isMatch = await user.comparePassword(password);

          if (!isMatch) {
            return done(null, false, { message: "Incorrect Password!! Need some dirt in your eye?" });
          };

          return done(null, user);
        // catch-block
        } catch (error: any) {
            return done(error);
        };
    }));

    passport.serializeUser((user, done) => {
      	const userId = (user as IUser)._id; // this mess is necessary becuase a simple "user._id" is not working for some reason I am unable to understand 
        done(null, userId);
    });

	passport.deserializeUser(async(id, done) => {
		// try-block
		try {
			const user = await User.findById(id);
			done(null, user || null);
		// catch-block
		} catch (error: any) {
			done(error);
		};
	});
};