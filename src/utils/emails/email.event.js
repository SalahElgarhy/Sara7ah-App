import { EventEmitter } from "events";
import sendEmail from "./sendEmailFiles.js";
import jwt from "jsonwebtoken";
import { subjects } from "./sendEmailFiles.js";
import {signup} from './generateHTML.js'
import { generateToken } from "../token/token.js";

export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", async (user) => {
     // generate token for email verification
        const token = generateToken({ payload: { email: user.email } });
        const link = `http://localhost:3000/auth/activate_account/${token}`;

        // sendEmail
        const emailSent = await sendEmail({ 
                to: user.email, 

                subject: subjects.register,

                 html: signup(link, user.name) });

})