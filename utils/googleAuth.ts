import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';
import { User} from '../models/user.model';
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });
export const googlePassport = passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.TWITTER_CLIENT_ID}`,
      clientSecret: `${process.env.TWITTER_CLIENT_SECRET}`,
      callbackURL: `${process.env.APP_URL_Render}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile,done ) => {
      try {
        if(!profile) {
          return new ApiError({
            en: 'Google authentication failed',
            ar: 'فشل المصادقة من جوجل'
          }, StatusCodes.BAD_REQUEST);
        }
        const existingUser = await User.findOne({ email: profile.emails?.[0]?.value });

        if (existingUser) {
          console.log('user is: ', existingUser)
          const token = existingUser.createToken();
          return done(null,{user: existingUser, token});
        }

        // User doesn't exist, create a new user
        const newUser = new User({
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          password: profile.id, // You may want to handle this differently
          image: profile.photos?.[0]?.value,
          registrationType: 'email',
        });

        const user = await newUser.save();
        return done(null,{user, token: user.createToken()}) ;
      } catch (error:any) {
        throw new ApiError({ en: error.message, ar: error.message }, StatusCodes.BAD_REQUEST);
      }
      
    }
  )
);
