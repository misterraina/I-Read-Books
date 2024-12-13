import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authRoute = express.Router();

// Register route (Admin only)
authRoute.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if an admin already exists
        const adminCount = await User.count({ where: { isAdmin: true } });
        if (adminCount >= 2) {
            return res.status(403).json({ error: 'Admin limit reached' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            username,
            passwordHash,
            isAdmin: true, // Ensure the user is an admin
        });

        res.status(201).json({ message: 'Admin registered successfully', user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin login route
authRoute.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.isAdmin) return res.status(403).json({ error: 'Access denied. Admin only.' });

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, username: user.username, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set token in an HTTP-only cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 90 * 60 * 1000, // 90 minutes
            // domain:"i-read-books.vercel.app",
            sameSite: 'None', // Adjust depending on your frontend-backend setup
            path: '/', 
        });


        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

authRoute.get('/validate-token', (req, res) => {
    const token = req.cookies?.adminToken; // Ensure cookies middleware is set up

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid', user: decoded });
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

// Logout route
authRoute.post('/logout', (req, res) => {
    // Clear the cookie by setting its expiration to the past
    res.clearCookie('adminToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'None', // Adjust SameSite as per your app's needs
        path: '/', // Match the path of the cookie
    });
    res.status(200).json({ message: 'Logout successful' });
});


export default authRoute ;
