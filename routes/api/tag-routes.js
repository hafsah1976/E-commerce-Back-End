const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// defining CRUD routes for the `/api/tags` endpoint

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

// Get one tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      // Include associated Product data
      include: [
        {
          model: Product, // Specify the associated model (Product)
          through: ProductTag, // Specify the intermediary model (ProductTag)
        },
      ],
    });

    // Check if the tag was not found
    if (!tagData) {

      // Respond with a 404 Not Found status and an error message
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    // Respond with the retrieved tag data as JSON
    res.json(tagData);
  } catch (error) {

    // If an error occurs during the process, log the error to the console
    console.error(error);

    // Send a 500 Internal Server Error status along with the error details
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// The POST request handler for creating a new tag
router.post('/', async (req, res) => {
  try {
    // Use the 'Tag' model to create a new tag with data from the request body.
    const tagData = await Tag.create(req.body);

    // If the tag is successfully created, send a 200 OK response with the tag data in JSON format.
    res.status(201).json(tagData); // Use 201 status code for successful resource creation

  } catch (error) {
    // If an error occurs during the creation process, log the error to the console
    console.error(error);

    // Send a 400 Bad Request status along with an error message and error details
    res.status(400).json({ error: 'Failed to create the tag.', details: error.message });
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update the tag's name using the 'Tag' model
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name, // Update the 'tag_name' field with the new value from the request body
      },
      {
        where: {
          id: req.params.id, // Find the tag by its 'id' specified in the request parameters
        },
      }
    );

    // Checking if the tag was not found and not updated
    if (!tagData[0]) {

      // Respond with a 404 Not Found status and an error message
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    // Respond with a success message upon successful update
    res.json({ message: 'Tag updated successfully.' });

  } catch (error) {
    // If an error occurs during the update process, log the error to the console
    console.error(error);

    // Send a 400 Bad Request status along with the error details
    res.status(400).json({ error: 'Failed to Update the tag.', details: error.message });

  }
});

// Delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value using the 'Tag' model
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id, // Find the tag by its 'id' specified in the request parameters
      },
    });

    // Check if the tag was not found and not deleted
    if (!tagData) {
      // Respond with a 404 Not Found status and an error message
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    // Respond with a success message upon successful deletion
    res.json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    // If an error occurs during the deletion process, log the error to the console
    console.error(error);

    // Send a 500 Internal Server Error status along with the error details
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router; // export the router for using in other parts of the application
