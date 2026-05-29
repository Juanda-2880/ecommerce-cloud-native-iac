const { Product, User, sequelize } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const whereClause = { is_published: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const products = await Product.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'seller',
        attributes: ['username']
      }],
      order: [['created_at', 'DESC']]
    });

    // Map to include seller_name for compatibility
    const formattedProducts = products.map(p => ({
      ...p.toJSON(),
      seller_name: p.seller ? p.seller.username : null
    }));

    res.json(formattedProducts);
  } catch (err) {
    console.error('Error in getAllProducts:', err);
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{
        model: User,
        as: 'seller',
        attributes: ['username']
      }]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const formattedProduct = {
      ...product.toJSON(),
      seller_name: product.seller ? product.seller.username : null
    };

    res.json(formattedProduct);
  } catch (err) {
    console.error('Error in getProductById:', err);
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price_cop, quantity, product_condition, is_negotiable, is_published } = req.body;
    const seller_id = req.user.id;
    
    // If a file was uploaded, use its S3 URL
    const image_url = req.file ? req.file.location : req.body.image_url;

    if (!name || !price_cop) {
      return res.status(400).json({ error: 'Name and Price are mandatory parameters.' });
    }

    if (req.user.role !== 'salesperson') {
      return res.status(403).json({ error: 'Access denied: Insufficient privileges.' });
    }

    const product = await Product.create({
      name,
      description,
      price_cop,
      quantity: quantity || 1,
      product_condition: product_condition || 'new',
      is_negotiable,
      image_url,
      is_published,
      seller_id
    });

    res.status(201).json({ 
      message: `Success: Product "${name}" successfully added to inventory.`, 
      productId: product.id 
    });
  } catch (err) {
    console.error('Error in createProduct:', err);
    res.status(500).json({ error: err.message });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { search, is_published } = req.query;

    const whereClause = { seller_id };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (is_published !== undefined) {
      whereClause.is_published = is_published === 'true' || is_published === true;
    }

    const products = await Product.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (err) {
    console.error('Error in getSellerProducts:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price_cop, quantity, product_condition, is_negotiable, is_published } = req.body;
    const seller_id = req.user.id;

    // For local storage, construct the URL using the filename
    const final_image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.seller_id !== seller_id) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }

    await product.update({ 
      name: name || product.name, 
      description: description || product.description, 
      price_cop: price_cop || product.price_cop, 
      quantity: quantity !== undefined ? quantity : product.quantity, 
      product_condition: product_condition || product.product_condition, 
      is_negotiable: is_negotiable !== undefined ? is_negotiable : product.is_negotiable, 
      image_url: final_image_url || product.image_url, 
      is_published: is_published !== undefined ? is_published : product.is_published 
    });

    res.json({ message: `Success: Product "${product.name}" updated.` });
  } catch (err) {
    console.error('Error in updateProduct:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const seller_id = req.user.id;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.seller_id !== seller_id) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }

    await product.destroy();
    res.json({ message: `Success: Product "${product.name}" has been deleted.` });
  } catch (err) {
    console.error('Error in deleteProduct:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
};
