const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// defining routes for the `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and their associated products
    const tagData = await Tag.findAll({
      // Include associated Product data
      include: [
        {
          model: Product, // Specify the associated model (Product)
          through: ProductTag, // Specify the intermediary model (ProductTag)
          as: 'products', // Specify the alias (as defined in your model association)
        },
      ],
    });

    // Respond with a 200 OK status and the retrieved tag data as JSON
    res.status(200).json(tagData);
  } catch (error) {
    // If an error occurs during the process, log the error to the console
    console.error(error);
    // Send a 500 Internal Server Error status along with the error details
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;
