import validator from "validator";
import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    const { name, password, role, pages = [], commission = 0 } = req.body;

    try {
        // Validate input
        if (!name || !password || !role) {
            return res.status(400).send({ success: false, message: "Missing required fields" });
        }

        if (password.length <= 4) {
            return res.status(400).send({ success: false, message: "Enter a strong password" });
        }

        // Check if user already exists
        const existUser = await User.findOne({ name });
        if (existUser) {
            return res.status(400).send({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Generate a unique userId (e.g., by counting documents or an increment logic)
        // const lastUser = await User.findOne().sort({ userId: -1 }).select('userId');
        // const userId = lastUser ? lastUser.userId + 1 : 1;

        // Create a new user
        const newUser = new User({
            name,
            password: hashPassword,
            role,
            pages,
            commission,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Generate a token
        const token = generateToken(user._id);

        // Send a success response
        res.status(201).send({
            success: true,
            authData: token,
            message: "User Registered",
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send({ success: false, message: "Server error" });
    }
};



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




const getUserDetails = async (req, res) => {
    const { userId } = req.body;
    console.log("deatil func run");
    
    try {
        // Use .lean() to get plain JavaScript object instead of Mongoose document
        const userDetail = await User.findById(userId).select('-password').lean();

        if (userDetail) {
            res.send({ success: true, userData: userDetail, message: "Complete Data Fetching" });
        } else {
            res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Server Error" });
    }
}


export {loginUser, registerUser, getUserDetails}