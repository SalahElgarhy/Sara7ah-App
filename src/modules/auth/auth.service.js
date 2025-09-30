
import User from '../../DB/modules/user.model.js';
import { emailEvent } from '../../utils/emails/email.event.js';
import { compareHash, hashing } from '../../utils/hashing/hash.js';
import { generateToken, verifyToken } from '../../utils/token/token.js';
import { encrypt } from '../../utils/encryption/encrypt.js';

export const register = async (req, res, next) => {
    try {
        const { password, phone } = req.body;

        // تشفير كلمة المرور
        const hashedPassword = hashing({ plaintext: password });
        
        // تشفير رقم الهاتف
        const encryptedPhone = encrypt({ plaintext: phone });

        // إنشاء المستخدم
        const user = await User.create({
            ...req.body,
            password: hashedPassword,
            phone: encryptedPhone
        });

        // إرسال البريد الإلكتروني
        emailEvent.emit("sendEmail", user);
        
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        next(error);
    }
};

   

export const login = async (req, res, next) => {
    
        const { email, password } = req.body;

        // check user exsist or no

        const user = await User.findOne({ email });

        if (!user) return next(new Error("email or password invalid"));

        if (!user.isUserActivated) return next(new Error("User account is not activated"));
            
        // check password
        const isMatch = (compareHash({plaintext: password , hash: user.password}));

         if(!isMatch) return next (new Error("email or password invalid"));
         
         return res.status(200).json({message : "Login successful" ,

           token: generateToken ({payload: {id :user._id , email: user.email , name: user.name}})
          }
           
                
         );
}

export const activateAccount = async (req, res, next) => {
        const { token } = req.params;
        
        if (!token) return next(new Error("Invalid activation link"));

        const decodedToken = verifyToken({ token });
        if (!decodedToken) return next(new Error("Invalid or expired activation link"));

        const { email } = decodedToken;

        // البحث عن المستخدم وتحديث حالة التفعيل
        const user = await User.findOneAndUpdate(
            { email }, 
            { isUserActivated: true }, 
            { new: true }
        );

        if (!user) {
            return next(new Error("Invalid activation link or user does not exist"));
        }

        return res.status(200).json({ 
            success: true,
            message: "Account activated successfully"
        });
}