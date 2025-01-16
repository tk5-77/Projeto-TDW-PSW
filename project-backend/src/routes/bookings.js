const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController'); // Certifique-se de que o caminho está correto

router.post('/', bookingController.create); // Rota POST para criar reservas
router.get('/', bookingController.getBookings); // Rota GET para obter reservas

module.exports = router;
