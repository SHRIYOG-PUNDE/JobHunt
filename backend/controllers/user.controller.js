import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";
export const register = async(req, res)=>{
    try {
        const {fullname, email, phonenumber, password, role } = req.body;
        if(!fullname || !email || !phonenumber || !password || !role){
            return res.status(400).json({
                message:"All fields are required, something is missing",
                success:false,
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists with this email",
                success:false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phonenumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
        })

    } catch (error) {
        console.log(error);
    }
}
export const login = async(req, res)=>{
    try {
        const {email, password, role } = req.body;        
        if(!email || !password || !role){
            return res.status(400).json({
                message:"All fields are required, something is missing",
                success:false,
            });
        };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false,
            });
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"All fields are required, something is missing",
                success:false,
            });
        }
        // check role
        if(role != user.role){
            return res.status(400).json({
                message:"Incorrect role selected",
                success:false,
            })
        };
        const tokenData = {
            userId:user._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"1d"});


        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile,
        }


        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly:true, sameSite:"strict"}).json({
            message:`welcome ${user.fullname}`,
            user,
            success:true,
        })
    } catch (error) {
     console.log(error);
    }
}
export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true,
        })
    } catch (error) {
        console.log(error);   
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        // console.log(fullname, email, phonenumber, bio, skills);
        
        const file = req.file;
        // cloudinary file will setup here

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        // if (!fullname || !email || !phonenumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Something is missing all fields are required",
        //         success: false,
        //     })
        // }

        

        let skillsArray = [];
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middlewear authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phonenumber) user.phonenumber = phonenumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
            
            
        // resume come later here
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }

        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            role:user.role,
            profile:user.profile,
        }

        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}
