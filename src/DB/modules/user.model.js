import { match } from "assert";
import { time } from "console";
import { Schema , model } from "mongoose";  


export const genders = {
    male: "male",
    female : "female"
} 

export const userRoles = {
    user: "user",
    admin: "admin"
};

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: [true, " Email already exists"],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,

    },
    isUserActivated: {
        type: Boolean,
        default: false
    },
    userRole: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.user
    },
    phone: { type: String, required: true , unique: true },
    
    isDeleted: { type: Boolean, default: false },
},
    {
        timestamps: true
    }

);




const User = model('User', userSchema);

export default User;