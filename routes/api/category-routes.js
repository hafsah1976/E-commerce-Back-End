// Import necessary modules and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Define a GET route for '/api/categories'
router.get('/', async (req, res) => {
  try {
    // Find all categories from the Category model
    const categoryData = await Category.findAll({
      // Include associated Products in the result
      include: [{ model: Product }],
    });

    // Send the category data as a JSON response
    res.json(categoryData);
  } catch (err) {
    // If an error occurs during the process, log the error to the console
    console.error(err);
    // Send a 500 Internal Server Error response along with the error details as JSON
    res.status(500).json(err);
  }
});
