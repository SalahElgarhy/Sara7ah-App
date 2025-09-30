import Joi from "joi";
import { validateRegister, isValidationMessages, generalFields } from "../../middleware/validation.middleware.js";

// send message validation
export const sendMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required() ,
    recipientId: Joi.custom(isValidationMessages)
    }).required()

// get single message validation
export const getSingleMessageSchema = Joi.object({
    messageId: Joi.custom(isValidationMessages).required()
}).required();




// get all messages validation
export const getAllMessagesSchema = Joi.object({
    flag: Joi.string()
        .valid("inbox", "sent")
        .required()
        .messages({
            'any.only': 'flag must be either "inbox" or "sent"',
            'any.required': 'flag is required'
        })
}).required();