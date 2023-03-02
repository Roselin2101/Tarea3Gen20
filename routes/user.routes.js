const { Router } = require('express');
const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/user.controllers');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { protect, protectAccountOwner } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', findAllUsers);
// http://localhost:3001/api/v1/users

router.get('/:id', validIfExistUser, findOneUser);
// http://localhost:3001/api/v1/users/1

router.use(protect);

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

router.patch(
  '/password/:id',
  [
    check('currentPasword', 'The current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'The new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner
  ],
  updatePassword
);
// http://localhost:3001/api/v1/users/1

router.delete('/:id', validIfExistUser, deleteUser);
// http://localhost:3001/api/v1/users/1

module.exports = {
  userRouter: router,
};
