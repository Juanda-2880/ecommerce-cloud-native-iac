const { Sequelize } = require('sequelize');
require('dotenv').config();

const [host, port] = (process.env.DB_HOST || '').split(':');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'ecommerce_admin',
  process.env.DB_PASS || 'SecurePassword123!',
  {
    host: host || 'localhost',
    port: port || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to RDS has been established successfully.');
    
    // We will sync in models/index.js or here
    await sequelize.sync({ alter: true });
    console.log('Database schema synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, initDB };
