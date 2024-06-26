import passport from 'passport';
import { Strategy as SnapchatStrategy } from 'passport-snapchat';
import { StatusCodes } from 'http-status-codes';
import ApiError from './ApiError';
import { User} from '../models/user.model';
import dotenv from "dotenv";
dotenv.config({ path: "../config/config.env" });
export const snapchatPassport = passport.use(
  new SnapchatStrategy(
    {
      clientID: `${process.env.SNAPCHAT_CLIENT_ID}`,
      clientSecret: `${process.env.SNAPCHAT_CLIENT_SECRET}`,
      callbackURL: `${process.env.APP_URL}/api/v1/auth/snapchat/callback`,
    },
    async (accessToken:any, refreshToken:any, profile:any,done: any) => {
      try {
        if(!profile) {
          return new ApiError({
            en: 'Google authentication failed',
            ar: 'فشل المصادقة من جوجل'
          }, StatusCodes.BAD_REQUEST);
        }
        console.log("profile :::::::::::::",profile);
        
        const existingUser = await User.findOne({ email: profile.emails?.[0]?.value }).select('-password');

        if (existingUser) {
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
        const token = user.createToken();
        // Retrieve the user excluding the 'password' field
        const userWithoutPassword = await User.findById(user._id).select('-password');
        console.log(userWithoutPassword,"userWi-----------------",token);
        
        return done(null,{user:userWithoutPassword, token}) ;
      } catch (error:any) {
        throw new ApiError({ en: error.message, ar: error.message }, StatusCodes.BAD_REQUEST);
      }
      
    }
  )
);
