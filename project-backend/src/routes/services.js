const express = require('express');
const { serviceController } = require('../controllers/serviceController');
const { auth, checkRole } = require('../middlewares/auth');
const router = express.Router();

router.get('/slotsLotation', serviceController.getServicesBooking);
router.post('/:entityId', auth, checkRole('admin_entity'), serviceController.create);
router.post('/:serviceId/slots', auth, checkRole('admin_entity', 'user_entity'), serviceController.createSlot);
router.get('/:serviceId/slots', auth, serviceController.getAvailableSlots);
// Rota para atualizar um slot específico, acessível para 'admin_entity' e 'user_entity'
router.put('/:serviceId/slots/:id', auth, checkRole('admin_entity', 'user_entity'), serviceController.updateSlot);
// Rota para deletar um slot específico, acessível para 'admin_entity' e 'user_entity'
router.delete('/:serviceId/slots/:id', auth, checkRole('admin_entity', 'user_entity'), serviceController.deleteSlot);
router.get('/entity/:entityId', serviceController.getServices);
router.post('/serviceEdit/:serviceId', serviceController.update);
router.delete('/deleteService/:serviceId', serviceController.deleteOne);

module.exports = router;