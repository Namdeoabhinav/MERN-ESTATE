import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  //As the request is coming from the body
  // console.log(req.body);

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  
  try {
    await newUser.save(); //This saves the data inside the database.
    res.status(201).json("User create sucessfully");
  } catch (error) {
    res.status(500).json(error.message);
  }

};
