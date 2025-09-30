import Joi from "joi";
import { validateRegister, isValidationMessages, generalFields } from "../../middleware/validation.middleware.js";


// update profile validation
export const updateProfile = Joi.object({
    email: generalFields.email,
    name: generalFields.name,
    phone: generalFields.phone,
    gender: generalFields.genders
}).required();


// change password validation
export const changePassword = Joi.object({
    oldPassword: generalFields.password.required(),
    newPassword: generalFields.password.required(),
    confirmPassword: Joi.string().valid
    (Joi.ref('newPassword')).messages({'any.only': 'Confirm password does not match'}).required()
}).required();



