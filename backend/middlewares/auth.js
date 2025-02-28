import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Attach user ID to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authUser;
