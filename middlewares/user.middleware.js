const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: ['id', 'name', 'email'],
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});

exports.validIfExistUsereEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (user && !user.status) {
    return next(
      new AppError(
        'The User has an account, but it is desactivated please talk to the administrador to activate it',
        400
      )
    );
  }
  if (user) {
    return next(new AppError('The email user already exists', 400));
  }
  req.user = user;
  next();
});
