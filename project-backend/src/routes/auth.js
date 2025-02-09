const express = require('express');
const router = express.Router();
const { register, login, googleLogin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);

module.exports = router;