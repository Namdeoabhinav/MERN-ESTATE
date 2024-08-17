import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'


export const test = (req,res) => {
    res.json({  
        message: 'Hello!',
    });
}

export const updateUser = async(req , res , next) => {
    //Firstly we need to verify the user.
    //For verifying creating verifyUser.js which will verify the user.
    if(req.user.id !== req.params.id) return next(errorHandler(401 , 'You can only update your own account'));
    try {
        if(req.body.password)
            //If the user is updating its password then we need to hash it
            req.body.password = bcryptjs.hashSync(req.body.password , 10);
            
            const updatedUser = await User.findByIdAndUpdate(req.params.id , {
                //We only need to update the data which is provided by user , for this we are using set
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar
                }
            },{new:true}); //{new:true} will save this updated user with the new information.
            
            const {password , ...rest} = updatedUser._doc; //Separating the password from the rest
            //Sending the response
            res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }

}