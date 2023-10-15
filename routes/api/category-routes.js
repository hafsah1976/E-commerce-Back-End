// Importing necessary modules and models
const router = require('express').Router();
const { Category, Product } = require('../../models');

// Defining The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    // Finding all categories
    const categoryData = await Category.findAll({
      // Include associated Products 
      include: [{ model: Product }],
    });

    // Checking if there are no categories found
    if (categoryData.length === 0) {
      return res.status(404).json({ message: 'No categories found.' });
    }

    // Sending the category data as a JSON response
    res.json(categoryData);
  } catch (error) {
    console.error(error);

    // Sending a 500 Internal Server Error response with a detail error message
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Defining the GET route for '/api/categories/:id' to retrieve a single category by ID
router.get('/:id', async (req, res) => {
  try {
    // Finding one category by its `id` value using the Category model
    const categoryData = await Category.findByPk(req.params.id, {
      // Include associated Products in the result
      include: [{ model: Product }],
    });

    // Check if the categoryData is null, meaning no category was found with the given ID
    if (!categoryData) {
      res.status(404).json({ message: 'Failed to find the requested Category.' });
      return;
    }

    // Sending the category data as a JSON response
    res.json(categoryData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error('Uh oh! Something is wrong! Please try again', error);
    // Sending a 500 Internal Server Error response with the error details as JSON
    res.status(500).json({ error: 'Internal Server Error', details: error.message });

  }
});

// Defining the POST route for creating a new category
router.post('/', async (req, res) => {
  try {
    // Creating a new category using the Category model and the data from the request body
    const categoryData = await Category.create({
      category_Name: req.body.category_Name,
    });

    // Sending a 201 Created status along with the created category data as a JSON response
    res.status(201).json(categoryData);
  } catch (error) {
    // If there's an error during the process, log the error to the console
    console.log('Failed to post category.', error);

    // Send a 500 Internal Server Error response with an error message
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Defining the PUT route for updating a category by its ID
router.put('/:id', async (req, res) => {
  try {
    //query to Update a category by its `id` value using the Category model
    const categoryData = await Category.update(
      {
        category_Name: req.body.category_Name, // Update the category name based on the request body
      },
      {
        where: {
          id: req.params.id, // Find the category with the provided ID
        },
      }
    );

    // Checking if no category was updated (categoryData[0] === 0) due to not finding the category with the given ID
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Failed to find the requested Category Data.' });
      return;
    }

    // Send a success message in the response to indicate that the category was updated successfully
    res.json({ message: 'Category updated successfully.' });
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Sending a 500 Internal Server Error response with the error details as JSON
    res.status(500).json(error);
  }
});
