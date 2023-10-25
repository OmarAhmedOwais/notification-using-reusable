"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const readline_1 = __importDefault(require("readline"));
const dotenv_1 = __importDefault(require("dotenv"));
const twilio_1 = __importDefault(require("twilio"));
dotenv_1.default.config({ path: './config/config.env' });
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`; // Your Account SID from www.twilio.com/console
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const verifySid = `${process.env.TWILIO_VERIFY_SID}`; // Use your actual Verify service SID
const client = (0, twilio_1.default)(accountSid, authToken);
const sendSMS = async (data) => {
    const { text, to, from } = data;
    try {
        // Send an SMS
        const message = await client.messages.create({
            body: text,
            from: from,
            to: to,
        });
        console.log(`Message sent with SID: ${message.sid}`);
        // Send a verification code via SMS
        const verification = await client.verify.services(verifySid).verifications.create({
            to: to,
            channel: 'sms',
        });
        console.log(`Verification status: ${verification.status}`);
        // Prompt for OTP
        const otpCode = await promptForOTP();
        // Check the verification code
        const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
            to: to,
            code: otpCode,
        });
        console.log(`Verification check status: ${verificationCheck.status}`);
        return true;
    }
    catch (error) {
        console.error('Error:', error.message);
        return false;
    }
};
exports.sendSMS = sendSMS;
const promptForOTP = () => {
    return new Promise((resolve) => {
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Please enter the OTP: ', (otpCode) => {
            rl.close();
            resolve(otpCode);
        });
    });
};
