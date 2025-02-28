import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ error: 'Unauthorized: No Token Provided' });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded) return res.status(401).json({ error: 'Unauthorized: Invalid Token' });

        const user = await User.findById(decoded.userId).select('-password');
        if(!user) return res.status(404).json({ error: 'User Not Found' });
        
        req.user = user;
        next();
    } catch (error) {
        req.status(500).json({ error: 'Interval server error !' });
    }
};