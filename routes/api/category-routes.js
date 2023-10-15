// Import necessary modules and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categoryData = await Category.findAll({
      // Include associated Products
      include: [{ model: Product }],
    });

    // Check if there are no categories found
    if (categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found.' });
    }

    // Send the category data as a JSON response
    res.json(categoryData);
  } catch (error) {
    console.error(error);

    // Send a 500 Internal Server Error response with an error message
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Define a GET route for '/api/categories/:id' to retrieve a single category by ID
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value using the Category model
    const categoryData = await Category.findByPk(req.params.id, {
      // Include associated Products in the result
      include: [{ model: Product }],
    });

    // Check if the categoryData is null, meaning no category was found with the given ID
    if (!categoryData) {
      res.status(404).json({ message: 'Failed to find the requested Category.' });
      return;
    }

    // Send the category data as a JSON response
    res.json(categoryData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 500 Internal Server Error response with the error details as JSON
    res.status(500).json(error);
  }
});


