const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validIfExistRepair } = require('../middlewares/repair.middleware');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { check } = require('express-validator');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = Router();

router.post(
  '/',

  [
    check('motorsNumber', 'The motorsNumber is mandatory').not().isEmpty(),
    check('descripcion', 'The description is mandatory').not().isEmpty(),
    check('date', 'The date must be a correct format YY-MM-DD').not().isEmpty(),
    check('userId', 'The userId is mandatory').not().isEmpty(),

    validateFields,
  ],
  createRepair
);

router.use(protect);

router.get('/', findAllRepairs, restrictTo('employee'));

router.get('/:id', validIfExistRepair, findOneRepair, restrictTo('employee'));

router.patch(
  '/:id',
  [
    check('motorsNumber', 'The motorsNumber is mandatory').not().isEmpty(),
    check('date', 'The date must be a correct format YY-MM-DD').not().isEmpty(),
    check('userId', 'The userId is mandatory').not().isEmpty(),
  ],
  validIfExistRepair,
  restrictTo('employee'),

  updateRepair
);

router.delete('/:id', validIfExistRepair, deleteRepair, restrictTo('employee'));

module.exports = {
  repairRouter: router,
};
