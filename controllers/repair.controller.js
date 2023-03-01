const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      status: ['pending', 'completed'],
    },
    include: [
      {
        model: User,
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });
});

exports.findOneRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  return res.status(200).json({
    status: 'success',
    repair,
  });
});
exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId, descripcion, motorsNumber } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    descripcion,
    motorsNumber,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Created Repair',
    repair,
  });
});
exports.updateRepair = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { repair } = req;

  await repair.update({ status });

  return res.status(200).json({
    status: 'success',
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
  });
});
