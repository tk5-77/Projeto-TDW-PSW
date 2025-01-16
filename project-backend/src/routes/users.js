const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/auth');
const bookingController = require('../controllers/bookingController');

router.post('/', auth, checkRole('Client'), bookingController.create);

module.exports = router;
