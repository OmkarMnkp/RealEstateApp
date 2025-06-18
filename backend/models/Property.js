const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('Property', {
  title: DataTypes.STRING,
  price: DataTypes.FLOAT,
  location: DataTypes.STRING,
  description: DataTypes.TEXT,
  type: DataTypes.STRING,
  imageUrl: DataTypes.STRING,

  interestedUsers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },

  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Property;
