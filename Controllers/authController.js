import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

// create a register controller
export const registerController = async (req, res) => {
  try {
    // Destructre the varibale
    const { username, email, password, confirmPassword } = req.body;

    // validation by backend
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({
        message: "Please fill all the fields",
      });
    }

    const exisitingUser = await userModel.findOne({ email: email });
    //  exisiting user
    if (exisitingUser) {
      return res.status(400).send({
        message: "This email is alredy register",
      });
    }

    // register user

    // check the password and cofirm password 
    if(password === confirmPassword){
      
      const hashedPassword = await hashPassword(password);

      // save
      const user = await new userModel({
        username,
        email,
        password: hashedPassword,
       
      }).save();
      return res.status(201).send({
        user,
        message: "User Register successfully",
      });
    }
    else{
      return res.status(400).send({
        message: "Password and confirm password not match",
      });
    }
   
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: "Server Error",
      // error
    });
  }
};
