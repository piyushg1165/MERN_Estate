import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => { 
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    try{
            await newUser.save()
            res.status(201).json({
                message: "User created successfully",
            });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }

        const isMatchPassword = bcrypt.compareSync(password, user.password);
        if (!isMatchPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );
        const { password: _, ...rest } = user._doc; 
        res.cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req, res, next) => {
    const { name, email, photo } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            );
            const { password: _, ...rest } = user._doc; 
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                profilePic: photo
            });
            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET
            );
            const { password: _, ...rest } = newUser._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(rest);
        }
       
    } catch (error) {
        next(error);
    }
};