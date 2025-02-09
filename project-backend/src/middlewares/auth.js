const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido.' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id }); // Use 'id' como no authController
        if (!user) {
            return res.status(404).json({ error: 'Utilizador não encontrado.' });
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Por favor, autentique-se.' });
    }
};
 const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        const userInfo = req.user;

        if(!allowedRoles.includes(userInfo.role)){
            return res.status(401).json({
                "message": "You are not allowed to access this endpoint!",
                "code": 0
            });
        }

        next();
    };
};


module.exports = { auth, checkRole };