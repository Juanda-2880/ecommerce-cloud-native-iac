const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Salesperson = sequelize.define('Salesperson', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  storeName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.0
  }
}, {
  tableName: 'salespeople',
  underscored: true,
  timestamps: false
});

User.hasOne(Salesperson, { foreignKey: 'userId', as: 'salespersonDetails' });
Salesperson.belongsTo(User, { foreignKey: 'userId' });

module.exports = Salesperson;
