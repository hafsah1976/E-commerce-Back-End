//import the express router
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models'); //import the models and all the associated models to create routese

// the api/products endpoint

// define the Get route to retrieve all products
router.get('/', async (req, res) => {
  try {
    // Finding all the products using the Product model
    const productData = await Product.findAll({
      // Include associated Category and Tag data in the result
      include: [{ model: Category }, { model: Tag }],
    });

    // Sending the product data, including associated Category and Tag data, as a JSON response
    res.json(productData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 500 Internal Server Error response along with the error details as JSON
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
