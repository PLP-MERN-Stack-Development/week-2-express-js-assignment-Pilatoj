const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");
const validateProduct = require("../middleware/validation");
const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");

let products = [
  { id: uuidv4(), name: "Laptop", description: "Powerful laptop for work and gaming", price: 1200, category: "Electronics", inStock: true },
  { id: uuidv4(), name: "Mouse", description: "Wireless mouse with ergonomic design", price: 25, category: "Electronics", inStock: true },
  { id: uuidv4(), name: "Keyboard", description: "Mechanical keyboard with RGB lighting", price: 75, category: "Electronics", inStock: false },
  { id: uuidv4(), name: "Desk Chair", description: "Ergonomic office chair", price: 150, category: "Furniture", inStock: true },
  { id: uuidv4(), name: "Monitor", description: "4K UHD monitor", price: 300, category: "Electronics", inStock: true },
  { id: uuidv4(), name: "Notebook", description: "A simple notebook", price: 5, category: "Stationery", inStock: true },
  { id: uuidv4(), name: "Pen Set", description: "Luxury pen set", price: 20, category: "Stationery", inStock: true },
];

// Helper to wrap async functions for error handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET all products with filtering, pagination, and search
router.get("/", auth, asyncHandler((req, res) => {
  let filteredProducts = [...products];

  // Filter by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
  }

  // Search by name
  if (req.query.search) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < filteredProducts.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  results.products = filteredProducts.slice(startIndex, endIndex);
  res.json(results);
}));

// GET a specific product by ID
router.get("/:id", auth, asyncHandler((req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    throw new NotFoundError("Product not found");
  }
}));

// POST a new product
router.post("/", auth, validateProduct, asyncHandler((req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
}));

// PUT update an existing product
router.put("/:id", auth, validateProduct, asyncHandler((req, res) => {
  const { name, description, price, category, inStock } = req.body;
  let product = products.find((p) => p.id === req.params.id);
  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.inStock = inStock !== undefined ? inStock : product.inStock;
    res.json(product);
  } else {
    throw new NotFoundError("Product not found");
  }
}));

// DELETE a product
router.delete("/:id", auth, asyncHandler((req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    throw new NotFoundError("Product not found");
  }
}));

// GET product statistics
router.get("/stats/category", auth, asyncHandler((req, res) => {
  const stats = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
}));

module.exports = router;

