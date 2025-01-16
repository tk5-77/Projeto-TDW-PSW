const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login); // Rota para login de utilizadores

module.exports = router;
