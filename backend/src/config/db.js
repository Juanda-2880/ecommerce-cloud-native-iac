const db = require('../models');

const initDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      console.log(`Attempting to connect to database... (${6 - retries}/5)`);
      await db.sequelize.authenticate();
      console.log('Connected to MySQL database via Sequelize');
      
      // Sync models with database
      await db.sequelize.sync({ force: false, alter: true });
      console.log('Database schema synchronized');
      return; // Success
    } catch (err) {
      retries -= 1;
      console.error(`Error connecting to the database: ${err.message}`);
      if (retries === 0) {
        console.error('All connection retries failed. Exiting...');
        // In a production app, you might want to exit here
        // process.exit(1);
      } else {
        console.log('Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
};

module.exports = { pool: db.sequelize, initDB };
