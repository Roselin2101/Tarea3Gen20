const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Repair = db.define('Repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  motorsNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
});

module.exports = Repair;
