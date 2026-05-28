module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
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

  return Buyer;
};
