import {googlePassport} from '../utils/googleAuth';
import { facebookPassport } from '../utils/facebookAuth';
import { twitterPassport } from '../utils/twitterAuth';
import { instagramPassport } from '../utils/instagramAuth';
import { snapchatPassport } from '../utils/snapchatAuth';


export const authenticateWithGoogle = googlePassport.authenticate('google', { scope: ['profile', 'email'] });

export const authenticateWithFacebook = facebookPassport.authenticate('facebook', { scope: ['profile', 'email'] });

export const authenticateWithInstagram = instagramPassport.authenticate('instagram', { scope: ['basic', 'email'] });

export const authenticateWithTwitter = twitterPassport.authenticate('twitter', { scope: ['profile', 'email'] });

export const authenticateWithSnapchat = snapchatPassport.authenticate('snapchat', { scope: ['profile', 'email'] });