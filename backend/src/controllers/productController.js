const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published } = req.body;
    const seller_id = req.user.id;

    if (!name || !price_cop) {
      return res.status(400).json({ error: 'Critical failure: Name and Price are mandatory parameters for deployment.' });
    }

    if (req.user.role !== 'salesperson') {
      return res.status(403).json({ error: 'Access denied: Insufficient privileges for product deployment.' });
    }

    const productId = await Product.create({
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

    res.status(201).json({ message: `Success: Component "${name}" successfully deployed to inventory.`, productId });
  } catch (err) {
    console.error('Error in createProduct:', err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(401).json({ error: 'Session invalid or user not found. Please log out and log in again.' });
    }
    res.status(500).json({ error: err.message });
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const seller_id = req.user.id;
    const { search, is_published } = req.query;

    const products = await Product.findAllBySeller(seller_id, { search, is_published });
    res.json(products);
  } catch (err) {
    console.error('Error in getSellerProducts:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price_cop, quantity, product_condition, is_negotiable, image_url, is_published } = req.body;
    const seller_id = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.seller_id !== seller_id) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }

    await Product.update(id, { 
      name, 
      description, 
      price_cop, 
      quantity: quantity || product.quantity, 
      product_condition: product_condition || product.product_condition, 
      is_negotiable, 
      image_url, 
      is_published 
    });
    res.json({ message: `Success: Component "${name || product.name}" configuration updated.` });
  } catch (err) {
    console.error('Error in updateProduct:', err);
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const seller_id = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.seller_id !== seller_id) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }

    await Product.delete(id);
    res.json({ message: `Termination Sequence Complete: Component "${product.name}" has been removed from the registry.` });
  } catch (err) {
    console.error('Error in deleteProduct:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getSellerProducts,
  updateProduct,
  deleteProduct
};
