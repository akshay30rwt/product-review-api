const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exisitingUser = await User.findOne({ email });

        if(exisitingUser) {
            return res.status(400).json({
                message: 'Email already registered'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const isMatching = await bcrypt.compare(password, user.password);
        if(!isMatching) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { userId: existingUser._id},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        );

        return res.status(200).json({ token });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = { register, login };