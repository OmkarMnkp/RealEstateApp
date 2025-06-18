const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GeneralInquiry = sequelize.define('GeneralInquiry', {
  inquiryType: DataTypes.STRING,   
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  message: DataTypes.TEXT
});

module.exports = GeneralInquiry;
