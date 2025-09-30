// Validation middleware
import { Types } from "mongoose";
import Joi from "joi";




const genders = {
  MALE: "male",
  FEMALE: "female"
};

export const validateRegister = (schema) => {
    return (req, res, next) => { 

    const data = {...req.body , ...req.params , ...req.query};
    const result = schema.validate(data, { abortEarly: false });

        if (result.error) {
            const messagelist = result.error.details.map(err => err.message);
            return next(new Error(messagelist.join(", "), { cause: 400 }));
        }

       return next();
    }
}





export const isValidationMessages = (value, helpers) => {
    if (Types.ObjectId.isValid(value)) {
        return value;
    }
    return helpers.error('any.invalid');
}

export const generalFields = {
     email: Joi.string().email(),
        password: Joi.string().min(6),
        confirmPassword: Joi.string().valid(Joi.ref('password')).messages({'any.only': 'Confirm password does not match'}),
        name: Joi.string().min(4).max(15),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).messages({'string.pattern.base': 'Phone number must be between 10 to 15 digits'}),
        genders: Joi.string().valid(...Object.values(genders))
}

export default isValidationMessages;
