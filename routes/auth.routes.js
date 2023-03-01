const { Router } = require('express');
const { validateFields } = require('../middlewares/validateFields.middleware');
const { validIfExistUsereEmail } = require('../middlewares/user.middleware');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth.controller');


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

module.exports = {
  authRouter: router,
};
