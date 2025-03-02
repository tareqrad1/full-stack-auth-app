import { sendPasswordRestInEmail, sendResetSuccessfulEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
import User from '../model/user.model.js';
import { generateTokenAndSetCookie } from '../util/generateTokenAndSetCookie.js';
import { signUpSchema } from '../util/validationSchema.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
export const signup = async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if(!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const { error } = signUpSchema.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });
    try {
        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name,
            email,
            password: hashPassword,
            verificationToken: verificationCode,
            verificationTokenExpireAt: Date.now() + 15 * 60 * 1000 // in 15 min end the code VerificationCode
        });
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        await sendVerificationEmail(user.email, verificationCode);
        res.status(201).json({ message: 'User created successfully', user: {
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        console.log('we have error in sign up', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const verifyEmail = async(req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpireAt: { $gt: Date.now() } // show the code if it is expire or not 
        });
        if(!user) {
            return res.status(404).json({ error: 'Invalid verification code' });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log('we have error in verify email', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const signin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ error: 'User not found' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) return res.status(401).json({ error: 'email or password is incorrect' });
        user.lastLogin = Date.now();
        generateTokenAndSetCookie(user._id, res);
        await user.save();
        res.status(200).json({ message: 'User logged in successfully', user: {
            ...user._doc,
            password: undefined
        }});
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const signout = async(req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ error: 'User not found' });
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpireAt = resetTokenExpireAt;
        await user.save();
        await sendPasswordRestInEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({ message: 'Password reset sent in your email !' })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const resetPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpireAt: { $gt: Date.now() }
        });
        if(!user) return res.status(400).json({ error: 'Invalid or expire reset token !' });
        const hashNewPassword = await bcrypt.hash(password, 10);
        user.password = hashNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireAt = undefined;
        await user.save();
        await sendResetSuccessfulEmail(user.email);
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wronggg' });
    }
};
export const checkAuth = async(req, res) => {
    try {
        const user = await User.findOne(req.user._id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Something went wronggg' });
    }
};