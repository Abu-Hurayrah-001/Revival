//IMPORTS
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../../models/user/user.model";
import passport, { PassportStatic } from "passport";

//PASSPORT.JS CONFIGURATION
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

const localOptions = {
    usernameField: "email",
    passwordField: "password",
};

export const initializePassport = (passport: PassportStatic) => {
    passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
        // try-block
        try {
          	const user = await User.findOne({ email }).select("+password");

          	if (!user) {
				done(null, false, { message: "Oopsies!! No user exists with that email" });
            	return;
		  	};

        	const isMatch = await user.comparePassword(password);

        	if (!isMatch) {
            	done(null, false, { message: "Incorrect Password!! Need some dirt in your eye?" });
            	return;
        	};

        	done(null, user);
        	return;
        // catch-block
        } catch (error: any) {
            done(error);
            return;
        };
    }));
};