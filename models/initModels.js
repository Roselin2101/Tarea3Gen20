const Repair = require('./repairs.model');
const User = require('./users.model');

const initModels = () => {
  // relation 1 - N
  User.hasMany(Repair);
  Repair.belongsTo(User);
};

module.exports = initModels;
