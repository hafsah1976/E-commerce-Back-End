const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products
router.get('/', async (req, res) => {
  try {
    // Find all products
    const productData = await Product.findAll({
      // Include associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one product by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its `id`
    const productData = await Product.findByPk(req.params.id, {
      // Include associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });

    if (!productData) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product
    const productData = await Product.create(req.body);

    // If there are product tags, create pairings in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(productData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update product by its `id`
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    // Update product data
    const [updatedRowCount] = await Product.update(updatedProductData, {
      where: {
        id: productId,
      },
    });

    // Check if the product was found and updated
    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'Failed to find the requested Product Data.' });
      return;
    }

    // If there are new product tags, update the ProductTag model within a transaction
    if (updatedProductData.tagIds && updatedProductData.tagIds.length) {
      // Get existing product tags
      const existingProductTags = await ProductTag.findAll({
        where: { product_id: productId },
      });

      // get existing tag_ids
      const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);

      // get new tag_ids from the request
      const newTagIds = updatedProductData.tagIds;

      // Identify tag_ids to remove and add
      const tagIdsToRemove = existingTagIds.filter((tagId) => !newTagIds.includes(tagId));
      const tagIdsToAdd = newTagIds.filter((tagId) => !existingTagIds.includes(tagId));

      // Remove tags within a transaction
      await sequelize.transaction(async (t) => {
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
        await ProductTag.bulkCreate(newProductTags, { transaction: t });
      });
    }

    res.json({ message: 'Product updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update requested Product Data.' });
  }
});


// Delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'Failed to find the requested Product Data.' });
      return;
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product.' });
  }
});

module.exports = router;
