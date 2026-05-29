const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'ecommerce_admin',
  process.env.DB_PASS || 'SecurePassword123!',
  {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./userModel')(sequelize, Sequelize);
db.Buyer = require('./buyerModel')(sequelize, Sequelize);
db.Salesperson = require('./salespersonModel')(sequelize, Sequelize);
db.Product = require('./productModel')(sequelize, Sequelize);
db.Order = require('./orderModel')(sequelize, Sequelize);
db.OrderItem = require('./orderItemModel')(sequelize, Sequelize);

// Define associations
// User - Buyer/Salesperson (One-to-One)
db.User.hasOne(db.Buyer, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.Buyer.belongsTo(db.User, { foreignKey: 'user_id' });

db.User.hasOne(db.Salesperson, { foreignKey: 'user_id', onDelete: 'CASCADE' });
db.Salesperson.belongsTo(db.User, { foreignKey: 'user_id' });

// User (Salesperson) - Product (One-to-Many)
db.User.hasMany(db.Product, { foreignKey: 'seller_id', as: 'products', onDelete: 'CASCADE' });
db.Product.belongsTo(db.User, { foreignKey: 'seller_id', as: 'seller' });

// User (Buyer) - Order (One-to-Many)
db.User.hasMany(db.Order, { foreignKey: 'buyer_id', as: 'orders', onDelete: 'CASCADE' });
db.Order.belongsTo(db.User, { foreignKey: 'buyer_id', as: 'buyer' });

// Order - OrderItem (One-to-Many)
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id' });

// Product - OrderItem (One-to-Many)
db.Product.hasMany(db.OrderItem, { foreignKey: 'product_id' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });

module.exports = db;
