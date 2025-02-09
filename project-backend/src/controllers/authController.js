const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Registro tradicional
const register = async (req, res) => {
    try {
        const { username, email, password, role, entity } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'client',
            entity: entity || null
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Registro falhou' });
    }
};

// Login tradicional
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error();
        }

        const token = jwt.sign({ id: user._id,role:user}, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(401).send({ error: 'Login falhou' });
    }
};

// Login com Google
const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = new User({
                username: payload.name,
                email: payload.email,
                role: 'client'
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.send({ token: jwtToken });
    } catch (error) {
        res.status(400).send({ error: 'Login Google falhou' });
    }
};

module.exports = { register, login, googleLogin };