import jwt from 'jsonwebtoken';
import User from '../DB/modules/user.model.js';
import dotenv from 'dotenv';
import { verifyToken } from '../utils/token/token.js';

dotenv.config();

export const auth = async (req, res, next) => {
   

        const { authorization } = req.headers;


        if (!authorization || !authorization.startsWith("Bearer ")) {

            return next (new Error("Access token is required and must be a Bearer token"));
        }
        
        // extract token from authorization header
        const token = authorization.split(" ")[1];
        const { id } = verifyToken({ token });

        const user = await User.findById(id).select('-password').lean();
                
            if (!user) {
            return next (new Error("User not found"));
            }
        

        req.user = user;
        
        next();

    } 

