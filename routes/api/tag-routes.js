const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags
    const tagData = await Tag.findAll({
      // Include associated Product data
      include: ({ model: ProductTag, through: Product, as: 'product_tag' })
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
      include: ({ model: Product, through: ProductTag})
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }

    res.json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tagData = await Tag.create(req.body);

    res.status(201).json(tagData);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
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
      res.status(404).json({ message: 'Tag not found.' });
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
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }

    res.json({ message: 'Tag deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;