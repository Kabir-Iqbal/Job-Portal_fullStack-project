import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/Cloudinary.js";
dotenv.config();



// register user
export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;


        // check if all fields are provided
        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        
        // cloudinary            // profille image
        const file = req.file
        const fileUri = getDataUri(file)

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user 
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto : cloudResponse.secure_url        // getting secure url for cloudinary response after uploading 
            }
        });

        return res.status(200).json({
            message: "User created successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}


// user login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;


        // check if all fields are provided
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
            });
        }
        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }



        //  check password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        // check if role is correct or not
        if (user.role !== role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false,
            });

        }

        // generate token
        const tokenData = {
            userId: user._id,
        }

        // 
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        let userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            token: token,
            profile : {
                profilePhoto : user.profile.profilePhoto
            }
        }

        //  return response in cookie i send token and user data in response
        return res.status(200).cookie("token", token, {
            httpOnly: true, secure: process.env.NODE_ENV !== "development", maxAge: 1 * 24 * 60 * 60 * 1000, sameSite: "strict",
        }).json({
            message: `Welcome ${user.fullname}`,
            success: true,
            user: userData,
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}



// logOut
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({

        })
    }
}


// update 
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        //  const {file} = req.files;   // file is the resume file
        const file = req.file;

        
        //  here userId get for giving this id in clodinary for overwrite old resume
        const userId = req.id

        // const userId = req.id;    // middlware authentication
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

       

        const publicId = `resume_${userId}`
        const fileUri = getDataUri(file)

        // //  save pdf on cloud
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            public_id: publicId,    // matching public id of file 
            overwrite: true        // overwrite is used for update old resume with this new one 

        })




        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",");
        }




        // update user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // update resume
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;       // secure_url is the url of the uploaded file
            user.profile.resumeOriginalName = file.originalname;   //get here originalname of file then save it in user profile
        }

        // save user data
        await user.save();

        // return response
        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user,
        });


    } catch (error) {
        console.log(error);
    }
}