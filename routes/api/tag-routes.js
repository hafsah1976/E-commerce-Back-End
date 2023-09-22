const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags
    const tagData = await Tag.findAll({
      // Include associated Product data
      include: [
        {
          model: Product, // must specify the associated model
          through: ProductTag, // must specify the intermediary model
          as: 'products', // must specify the alias (as defined in your model association) like in sql where we use AS to give a table an alias name
        },
      ],
    });

    res.status(200).json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Get one tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // Include associated Product data
      include: [
        {
          model: Product, // must specify the associated model
          through: ProductTag, // must specify the intermediary model
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// The POST request handler for a specific tag-routes
router.post('/', async (req, res) => {
  // Create a new tag

  try {
    // Use the 'Tag' model to create a new tag with data from the request body.
    const tagData = await Tag.create(req.body);
    
    // If the tag is successfully created, send a 200 OK response with the tag data in JSON format.
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
  }
});


// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update the tag's name
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!tagData[0]) {
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    res.json({ message: 'Tag updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});




// Delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Failed to find the requested Tag Data.' });
      return;
    }

    res.json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;