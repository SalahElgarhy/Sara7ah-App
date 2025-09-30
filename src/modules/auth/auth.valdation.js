import { genders } from "../../DB/modules/user.model.js";
import Joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
// register validation
export const register = Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword.required(),
    name: generalFields.name.required(),
    phone: generalFields.phone,
    genders: generalFields.genders.required()
    
}).required();




// login validation
export const login = Joi.object({
    email: generalFields.email.required(),
    password: generalFields.password.required()
}).required();


