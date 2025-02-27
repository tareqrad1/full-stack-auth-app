import User from '../model/user.model.js';
import { generateTokenAndSetCookie } from '../util/generateTokenAndSetCookie.js';
import { signUpSchema } from '../util/validationSchema.js';
import bcrypt from 'bcryptjs';
export const signup = async(req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const { error } = signUpSchema.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });
    try {
        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            name,
            email,
            password: hashPassword,
            verificationToken: VerificationCode,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 // in 1 hour end the code VerificationCode
        });
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
export const signin = async(req, res) => {
    res.send('signin')
};
export const signout = async(req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};