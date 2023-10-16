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

// Get one product by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id` using the Product model
    const productData = await Product.findByPk(req.params.id, {
      // Include associated Category and Tag data in the result
      include: [{ model: Category }, { model: Tag }],
    });

    // Check if no product was found with the given ID
    if (!productData) {
      res.status(404).json({ message: 'Failed to find the requested Product.' });
      return;
    }

    // Send the product data, including associated Category and Tag data, as a JSON response
    res.json(productData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 500 Internal Server Error response with the error details as JSON
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product using the Product model and data from the request body
    const productData = await Product.create(req.body);

    // If there are product tags (tagIds) provided, create associations in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      // Prepare an array of objects for bulk creation in the ProductTag model
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id, // Assign the product's ID
          tag_id, // Assign the tag's ID
        };
      });

      // Bulk create product-tag associations in the ProductTag model
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Send a 201 Created status along with the created product data as a JSON response
    res.status(201).json(productData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 400 Bad Request status along with the error details as JSON
    res.status(400).json({error: 'Bad Request', details: error.message});
  }
});

