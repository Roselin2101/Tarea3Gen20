const { Router } = require('express');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { validIfExistUsereEmail } = require('../middlewares/user.middleware');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth.controller');
// const { createUser } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/signup',

  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    validateFields,
    validIfExistUsereEmail,
  ],
  createUser
);

router.post(
  '/login',
  [
    check('email', 'The email is mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
