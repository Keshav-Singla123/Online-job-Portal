import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Validation functions
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        };
        
        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                message: "Please provide a valid email address.",
                success: false
            });
        };
        
        // Validate phone number
        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be 10 digits.",
                success: false
            });
        };
        
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long.",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: "",
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Server error during registration.",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false 
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        const isProduction = process.env.NODE_ENV === 'production';
        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            secure: isProduction,
            sameSite: 'strict' 
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error during login.",
            success: false
        });
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            message: "Server error during logout.",
            success: false
        });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }
        
        // Validate email if provided
        if (email && email !== user.email) {
            if (!validateEmail(email)) {
                return res.status(400).json({
                    message: "Please provide a valid email address.",
                    success: false
                });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already in use.",
                    success: false
                });
            }
        }
        
        // Validate phone number if provided
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({
                message: "Phone number must be 10 digits.",
                success: false
            });
        }

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",").map(s => s.trim()).filter(s => s);
        }
        
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skillsArray) user.profile.skills = skillsArray

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            message: "Server error while updating profile.",
            success: false
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        if (!users || users.length === 0) {
            return res.status(200).json({
                message: "No users found.",
                users: [],
                success: true
            })
        }
        return res.status(200).json({
            message: `Total ${users.length} users found.`,
            users,
            success: true
        })
    } catch (error) {
        console.error("Get all users error:", error);
        return res.status(500).json({
            message: "Server error while fetching users.",
            success: false
        });
    }
}