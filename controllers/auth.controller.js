const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  // 1. Crear una instancia de la clase user

  constuser = new User({ name, email, password, role });

  //2. encriptar la contraseña

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.has(password, salt);

  //3. Guardar en la base de datos con la contraseña encriptada
  await user.save();

  res.status(201).json({
    status: 'success',
    message: 'User created sussessfully',
    user,
  });
});
