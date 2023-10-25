"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateWithFacebook = exports.authenticateWithGoogle = void 0;
const googleAuth_1 = require("../utils/googleAuth");
const facebookAuth_1 = require("../utils/facebookAuth");
exports.authenticateWithGoogle = googleAuth_1.googlePassport.authenticate('google', { scope: ['profile', 'email'] });
exports.authenticateWithFacebook = facebookAuth_1.facebookPassport.authenticate('facebook', { scope: ['profile', 'email'] });
