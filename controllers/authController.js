import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const authRegisterController = async (req, res) => {
  try {
    const existing_user = await userModel.findOne({ email: req.body.email });
    if (existing_user) {
      console.log("User already exists");
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    //Hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //rest data
    const user = new userModel(req.body);
    await user.save();
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error");
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

export const authLoginController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    
    const existing_user = await userModel.findOne({ email: userEmail });
    if (!existing_user) {
        return res.status(404).send({
            success: false,
            message: "User not found. Better try signing up!!!",
        });
    }
    const user = existing_user
    const userPassword = req.body.password;

    // ROLE Check
    if(user.role !== req.body.role){
        return res.status(401).send({
            success: false,
            message: "Role does not match"
        })
    }

    //Compare Password
    const comparePassword = await bcryptjs.compare(userPassword,user.password)
    if(!comparePassword){
        return res.status(401).send({
            success: false,
            message: "Wrong Password!!!"
        })
    }
    
    //create token
    const token = jwt.sign({
        userId: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        });
    return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user,
        token
    })
    
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

export const currentUserController = async (req,res,next) => {
    try{
        const user = await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success:true,
            message: "Successfully found the user",
            user
        })
    }
    catch{error}{
        console.log("Error");
        res.status(500).send({
            success:false,
            message: "Cannot GET User"
        })
    }
}