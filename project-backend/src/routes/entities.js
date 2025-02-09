const express = require('express');
const entityController  = require('../controllers/entityController');
const { auth, checkRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, checkRole(['admin_entity']), entityController.create);
router.get('/', auth, entityController.getAll);
router.get('/services', auth, entityController.getServices);
router.get('/:id/services', auth, entityController.getServices);
router.get('/getAdminEntities', auth, entityController.getOne);

module.exports = router;