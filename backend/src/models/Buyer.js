const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Buyer = sequelize.define('Buyer', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'buyers',
  underscored: true,
  timestamps: false
});

User.hasOne(Buyer, { foreignKey: 'userId', as: 'buyerDetails' });
Buyer.belongsTo(User, { foreignKey: 'userId' });

module.exports = Buyer;
