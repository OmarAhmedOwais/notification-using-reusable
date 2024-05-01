"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateWithTiktok = exports.authenticateWithSnapchat = exports.authenticateWithTwitter = exports.authenticateWithInstagram = exports.authenticateWithFacebook = exports.authenticateWithGoogle = void 0;
const googleAuth_1 = require("../utils/googleAuth");
const facebookAuth_1 = require("../utils/facebookAuth");
const twitterAuth_1 = require("../utils/twitterAuth");
const instagramAuth_1 = require("../utils/instagramAuth");
const snapchatAuth_1 = require("../utils/snapchatAuth");
const tiktokAuth_1 = require("../utils/tiktokAuth");
exports.authenticateWithGoogle = googleAuth_1.googlePassport.authenticate("google", {
    scope: ["profile", "email"],
});
exports.authenticateWithFacebook = facebookAuth_1.facebookPassport.authenticate("facebook", { scope: ["public_profile", "email"] });
exports.authenticateWithInstagram = instagramAuth_1.instagramPassport.authenticate("instagram", { scope: ["user_profile", "user_media"] });
exports.authenticateWithTwitter = twitterAuth_1.twitterPassport.authenticate("twitter");
exports.authenticateWithSnapchat = snapchatAuth_1.snapchatPassport.authenticate("snapchat", {
    scope: [
        "https://auth.snapchat.com/oauth2/api/user.display_name",
        "https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar",
    ],
});
exports.authenticateWithTiktok = tiktokAuth_1.tiktokPassport.authenticate("tiktok", {
    scope: ["user.info.basic"],
});
