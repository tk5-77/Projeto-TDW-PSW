const express = require('express');
const { entityController } = require('../controllers/entityController');
const { auth, checkRole } = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, checkRole('admin'), entityController.create);
router.get('/', auth, entityController.getAll);
router.get('/:id', auth, entityController.getOne);