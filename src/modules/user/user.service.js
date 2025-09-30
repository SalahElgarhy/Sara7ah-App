import CryptoJS from 'crypto-js';   
import { decrypt } from '../../utils/encryption/encrypt.js';
import { encrypt } from '../../utils/encryption/encrypt.js';
import User from '../../DB/modules/user.model.js';
import { compareHash, hashing } from '../../utils/hashing/hash.js';
import userModel from "../../DB/modules/user.model.js";

export const profile = async (req, res) => {
   

        const user = req.user;

         
        // decrypt phone number
        const phone = decrypt({ciphertext: user.phone});

        res.json({ 
            message: "Profile retrieved successfully", 
            user: { ...user, phone } 
        });
    }


export const updateProfile = async (req, res , next) => {


        if (req.body.phone) {
            // Encrypt the phone number before saving
            req.body.phone = encrypt({plaintext: req.body.phone, key: process.env.ENCRYPTION_KEY}).toString();
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {...req.body}, {new: true , runValidators: true});

        if (!updatedUser) return next (new Error("User not found" , {cause: 404}) );

        res.json({ message: "Profile updated successfully", user: updatedUser });
    };
    

export const changePassword = async (req, res , next) => {
    const { oldPassword, newPassword } = req.body;
    // 1️⃣ Find user by ID
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Check old password
    const isMatch = compareHash({ plaintext: oldPassword, hash: user.password });
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    // 3️⃣ Hash new password
user.password = hashing({ plaintext: newPassword });
    await user.save();
    

    return res.status(200).json({ message: "Password changed successfully" });
    };
    
    
export const deleteAccount = async (req, res , next) => {
        const deletedUser = await User.findByIdAndDelete(req.user._id , {isDeleted: true});
        if (!deletedUser) return next (new Error("User not found" , {cause: 404}) );
        res.status(200).json({ message: "Account deleted successfully" });
}    