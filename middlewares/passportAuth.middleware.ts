import {googlePassport} from '../utils/googleAuth';
import { facebookPassport } from '../utils/facebookAuth';

export const authenticateWithGoogle = googlePassport.authenticate('google', { scope: ['profile', 'email'] });

export const authenticateWithFacebook = facebookPassport.authenticate('facebook', { scope: ['profile', 'email'] });
