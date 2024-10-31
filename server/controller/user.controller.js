import validator from "validator";
import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res)=>{
    const {name,email,password,phoneNumber,role} = req.body;
    
    
    
    try {
        const existUser = await User.findOne({name})
        
        if(existUser){
            res.send({success:false, message:"User already exist"})
        }

        if(!validator.isEmail(email)){
            res.send({success:false,message:"Enter valid Email"})
        }

        if(!password.length > 4){
            res.send({success:false, message:"Enter Strong Password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name:name,
            email:email,
            password:hashPassword,
            phoneNumber:phoneNumber,
            role:role
        })

        const user = await newUser.save()
        const token = generateToken(user._id)

        res.send({success:true,authData:token, message:"User Registered"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '1h'})
}

const loginUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({name});

        if (!user || user.delete == true) {
            return res.send({ success: false, message: "User Does Not Exist" });
        }

        if (!password || !user.password) {
            return res.send({ success: false, message: "Password is missing or incorrect" });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send({ success: false, message: "Invalid Credentials" });
        }

        // Generate a token (assuming generateToken is a custom function)
        const token = generateToken(user._id);

        // Send success response with the token
        res.send({success:true,authData:token, message:"User Login"})

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Server Error" });
    }
};


export {loginUser, registerUser}