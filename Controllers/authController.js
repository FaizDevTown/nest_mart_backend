import userModel from "../models/userModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

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
      const token  = await JWT.sign({_id: user._id},process.env.JWT_SECRET, {
        expiresIn: "7d",})
      return res.status(201).send({
        user,
        message: "User Register successfully",
        success:true,
        token
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

// post login 
export const loginController = async (req,res)=>{
  try {
    // Destructre the variables
    const {username, password}= req.body;
    if(!username || !password){
      return res.status(400).send({
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({username: username})
    if(!user){
      return res.status(400).send({
        message: "User not found",
      });
    }
    const match = await comparePassword(password, user.password);
    if(!match){
      return res.status(400).send({
        message: "Invalid Password",
      });
    }
    const token  = await JWT.sign({_id: user._id},process.env.JWT_SECRET, {
      expiresIn: "7d",})
res.status(200).send({
  success: true,
  message: "login successfully",
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
   
    role: user.role,
  },
  token,
})



    // validation 
    // const { usernameOrEmail, password } = req.body;

    // Check if the input is a valid email
    // const isEmail = /\S+@\S+\.\S+/.test(usernameORemail);
  
    
      // let user;
      // if (isEmail) {
      //   user = await User.findOne({ email: usernameOrEmail });
      // } else {
      //   user = await User.findOne({ username: usernameOrEmail });
      // }
  
      // if (!user) {
      //   return res.status(400).json({ message: 'User not found' });
      // }
  
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
    
  }

}
