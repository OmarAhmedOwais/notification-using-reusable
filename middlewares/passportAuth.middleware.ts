import { googlePassport } from "../utils/googleAuth";
import { facebookPassport } from "../utils/facebookAuth";
import { twitterPassport } from "../utils/twitterAuth";
import { instagramPassport } from "../utils/instagramAuth";
import { snapchatPassport } from "../utils/snapchatAuth";
import { tiktokPassport } from "../utils/tiktokAuth";

export const authenticateWithGoogle = googlePassport.authenticate("google", {
  scope: ["profile", "email"],
});

export const authenticateWithFacebook = facebookPassport.authenticate(
  "facebook",
  { scope: ["public_profile", "email"] }
);

export const authenticateWithInstagram = instagramPassport.authenticate(
  "instagram",
  { scope: ["user_profile", "user_media"] }
);

export const authenticateWithTwitter = twitterPassport.authenticate("twitter");

export const authenticateWithSnapchat = snapchatPassport.authenticate(
  "snapchat",
  {
    scope: [
      "https://auth.snapchat.com/oauth2/api/user.display_name",
      "https://auth.snapchat.com/oauth2/api/user.bitmoji.avatar",
    ],
  }
);

export const authenticateWithTiktok = tiktokPassport.authenticate("tiktok", {
  scope: ["user.info.basic"],
});