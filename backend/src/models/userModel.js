const User = require('./User');
const Buyer = require('./Buyer');
const Salesperson = require('./Salesperson');
const { sequelize } = require('../config/db');

const UserModel = {
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  findByUsername: async (username) => {
    return await User.findOne({ where: { username } });
  },

  findById: async (id) => {
    return await User.findByPk(id, {
      attributes: ['id', 'username', 'email', 'role']
    });
  },

  create: async (username, email, password, role) => {
    const t = await sequelize.transaction();

    try {
      const user = await User.create({
        username,
        email,
        password,
        role
      }, { transaction: t });

      if (role === 'salesperson') {
        await Salesperson.create({ userId: user.id }, { transaction: t });
      } else {
        await Buyer.create({ userId: user.id }, { transaction: t });
      }

      await t.commit();
      return user.id;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
};

module.exports = UserModel;
