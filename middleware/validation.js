const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
    return res.status(400).send('Missing or invalid product fields');
  }
  next();
};

module.exports = validateProduct;

