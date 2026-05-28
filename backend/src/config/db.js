const db = require('../models');

const initDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connected to MySQL database via Sequelize');
    
    // Sync models with database
    // Use { alter: true } in development to update tables without dropping them
    // Use { force: false } to not drop tables
    await db.sequelize.sync({ force: false, alter: true });
    console.log('Database schema synchronized');
  } catch (err) {
    console.error('Error connecting to the database or synchronizing schema:', err.message);
  }
};

module.exports = { pool: db.sequelize, initDB };
