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
