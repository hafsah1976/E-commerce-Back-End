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

// Update product by its `id`
router.put('/:id', async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const productId = req.params.id;
    
    // Extract the updated product data from the request body
    const updatedProductData = req.body;

    // Update the product data using the Product model
    const [updatedRowCount] = await Product.update(updatedProductData, {
      where: {
        id: productId, // Find the product by its ID
      },
    });

    // Check if the product was found and updated
    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'Failed to find the requested Product Data.' });
      return;
    }

    // If there are new product tags (tagIds), update the ProductTag model within a transaction
    if (updatedProductData.tagIds && updatedProductData.tagIds.length) {
      // Get existing product tags for the specified product
      const existingProductTags = await ProductTag.findAll({
        where: { product_id: productId },
      });

      // Extract existing tag IDs
      const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);

      // Extract new tag IDs from the request
      const newTagIds = updatedProductData.tagIds;

      // Identify tag IDs to remove and add
      const tagIdsToRemove = existingTagIds.filter((tagId) => !newTagIds.includes(tagId));
      const tagIdsToAdd = newTagIds.filter((tagId) => !existingTagIds.includes(tagId));

      await sequelize.transaction(async (t) => {
        // Remove tags
        await ProductTag.destroy({
          where: {
            product_id: productId,
            tag_id: tagIdsToRemove,
          },
          transaction: t,
        });

        // Create new ProductTag records
        const newProductTags = tagIdsToAdd.map((tag_id) => ({
          product_id: productId,
          tag_id,
        }));

        // Use try-catch to handle any errors that occur during the bulk create
        try {
          await ProductTag.bulkCreate(newProductTags, { transaction: t });
        } catch (bulkCreateError) {
          // Rollback the transaction and handle the error
          await t.rollback();
          throw bulkCreateError; // Re-throw the error for higher-level error handling
        }
      });
    }

    // Respond with a success message
    res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 400 Bad Request status along with an error message details
    res.status(400).json({ 
      message: 'Failed to update requested Product Data.',
      errorDetails: error.message, // Include the error message in the response
    });
  }
});

// Delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Attempt to delete the product by its ID using the Product model
    const productData = await Product.destroy({
      where: {
        id: req.params.id, // Find the product by its ID in the request parameters
      },
    });

    // Check if the product was not found and not deleted
    if (!productData) {
      res.status(404).json({ message: 'Failed to find the requested Product Data.' });
      return;
    }

    // Respond with a success message upon successful deletion
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 500 Internal Server Error status along with an error message
    res.status(500).json({ message: 'Failed to delete the requested product.', details: error.message });
  }
});

module.exports = router;
