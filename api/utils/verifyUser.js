//This is for verifying user.

import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req , res , next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401 , 'Unauthorized'));
    //If token is recieved then we need to verify it.
    //Verifying it using jwt.
    jwt.verify(token , process.env.JWT_SECRET , (err , user) => {
        //If there is an error;
        if(err) return next(errorHandler(403 , 'Forbidden'));

        //If no error then we will pass this user to update its profile.
        req.user = user;
        next();
    });
};
