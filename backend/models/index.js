const sequelize = require('../config/db');
const Property = require('./Property');
const User = require('./User');
const Inquiry = require('./Inquiry');

User.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Property.hasMany(Inquiry, { foreignKey: 'propertyId' });
Inquiry.belongsTo(Property, { foreignKey: 'propertyId' });

sequelize.sync({ alter: true });

module.exports = { sequelize, User, Property, Inquiry };
