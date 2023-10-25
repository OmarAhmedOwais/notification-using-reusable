"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googlePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const user_model_1 = require("../models/user.model");
exports.googlePassport = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: '486588801461-p7rctdsvdq0tp42617cf8m86bkjjvfnd.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3001/api/v1/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        if (!profile) {
            return new ApiError_1.default({
                en: 'Google authentication failed',
                ar: 'فشل المصادقة من جوجل'
            }, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const existingUser = await user_model_1.User.findOne({ email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value });
        if (existingUser) {
            console.log('user is: ', existingUser);
            const token = existingUser.createToken();
            return done(null, { user: existingUser, token });
        }
        // User doesn't exist, create a new user
        const newUser = new user_model_1.User({
            email: (_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
            name: profile.displayName,
            password: profile.id,
            image: (_f = (_e = profile.photos) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value,
            registrationType: 'email',
        });
        const user = await newUser.save();
        return done(null, { user, token: user.createToken() });
    }
    catch (error) {
        throw new ApiError_1.default({ en: error.message, ar: error.message }, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}));
