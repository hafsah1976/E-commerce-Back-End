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
    // Update product data
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If there are new product tags, update the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      // get existing product tags
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create a filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions (remove and create) within a transaction
      await sequelize.transaction(async (t) => {
        await ProductTag.destroy({ where: { id: productTagsToRemove }, transaction: t });
        await ProductTag.bulkCreate(newProductTags, { transaction: t });
      });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
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
      res.status(404).json({ message: 'Product not found.' });
      return;
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
