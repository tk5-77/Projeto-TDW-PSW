const express = require('express');
const { serviceController } = require('../controllers/serviceController');
const { auth, checkRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/:entityId', auth, checkRole('AdminEntity'), serviceController.create);
router.post('/:serviceId/slots', auth, checkRole('AdminEntity', 'UserEntity'), serviceController.createSlot);
router.get('/:serviceId/slots', auth, serviceController.getAvailableSlots);
