const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middlewares/auth');
const bookingController = require('../controllers/bookingController'); // Certifique-se de que o caminho está correto

router.post('/', auth, bookingController.createBooking); // Rota POST para criar reservas
router.get('/', auth, bookingController.getBookings); // Rota GET para obter reservas
router.get('/getUserBookings', auth, bookingController.getUserBookings); // Rota GET para obter uma reserva específica
router.delete('/deleteBooking/:id', auth, bookingController.deleteBooking); // Rota DELETE para deletar uma reserva
router.delete('/getUserBookings', auth, bookingController.deleteBooking);
router.get('/getUserPastBookings', auth, bookingController.getUserPastBookings); 

module.exports = router;