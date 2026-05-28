module.exports = (sequelize, DataTypes) => {
  const Salesperson = sequelize.define('Salesperson', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    store_name: {
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

  return Salesperson;
};
