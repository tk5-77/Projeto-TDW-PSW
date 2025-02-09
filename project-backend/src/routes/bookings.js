const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/auth');
const bookingController = require('../controllers/bookingController'); // Certifique-se de que o caminho está correto

router.post('/', auth, bookingController.createBooking); // Rota POST para criar reservas
router.get('/', auth, bookingController.getBookings); // Rota GET para obter reservas

module.exports = router;