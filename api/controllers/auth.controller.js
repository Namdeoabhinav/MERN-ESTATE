import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  //As the request is coming from the body
  // console.log(req.body);

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword }); // Saving it inside the database using newUser.

  try {
    await newUser.save(); //This saves the data inside the database.
    res.status(201).json("User create sucessfully");
  } catch (error) {
    next(error); //Using the middleware that we created in the index.js.
  }
  //creating the folder utils -> error , in this error handler function is created for generating the custom errors.
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Checking the user is valid or not.
    const validUser = await User.findOne({ email }); //Finding the user with the email
    if (!validUser) return next(errorHandler(404, "User not found!"));

    //Now checking the password provided by the user matches with the password stored in database.
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Incorrect credentials!"));

    //creating the token uing JWT.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //saving it as a cookie
    const {password: pass , ...rest} = validUser._doc //separating password from the other data.
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//creating the google route controller.
export const google = async (req , res , next) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if(user){
      //user is existing.
      const token = jwt.sign({id: user._id} , process.env.JWT_SECRET);
      const {password , ...rest} = user._doc;
      res.cookie('access_token' , token , {httpOnly: true}).status(200).json(rest);
    }else {
      //create the user.
      //As the password required is true we need to generate the password.
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword , 10);
      //creating the new user with this username , email & password.
      const newUser = new User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email , password: hashedPassword , avatar: req.body.photo});
      await newUser.save();
      //Passing token w.r.t this user.
      const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET);
      const {password , ...rest} = newUser._doc;
      res.cookie('access_token' , token , {httpOnly: true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
}

export const signOut = async(req , res , next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');

  } catch (error) {
    next(error);
  }
}