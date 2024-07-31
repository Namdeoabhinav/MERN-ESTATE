import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res , next) => {
  //As the request is coming from the body
  // console.log(req.body);

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save(); //This saves the data inside the database.
    res.status(201).json("User create sucessfully");
  } catch (error) {
    next(error);
  }

  //creating the folder utils -> error , in this error handler function is created.
};
