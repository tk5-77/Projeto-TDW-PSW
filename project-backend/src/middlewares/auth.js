const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        req.token = token;
        next();
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate' });
        }
};

const checkrole= (...roles) => {   
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        next();
    };
}

module.exports = { auth, checkrole };