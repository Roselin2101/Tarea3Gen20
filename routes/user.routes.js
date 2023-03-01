const { Router } = require('express');
const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controllers');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields.middleware');

const router = Router();

router.get('/', findAllUsers);
// http://localhost:3001/api/v1/users

router.get('/:id', validIfExistUser, findOneUser);
// http://localhost:3001/api/v1/users/1

router.patch(
  '/:id',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
  ],

  validIfExistUser,
  updateUser
);
// http://localhost:3001/api/v1/users/1

router.delete('/:id', validIfExistUser, deleteUser);
// http://localhost:3001/api/v1/users/1

module.exports = {
  userRouter: router,
};
