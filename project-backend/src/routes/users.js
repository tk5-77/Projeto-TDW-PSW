const express = require('express');
const { bookingController } = require('../controllers/bookingController');
const { auth, checkRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, checkRole('Client'), bookingController.create);
router.post('/:id/cancel', auth, checkRole('Client'), bookingController.cancel);

module.exports = router;