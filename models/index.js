// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations between models

// Products belong to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // The foreign key in the Product model that associates it with Category
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // The foreign key in the Product model that associates it with Category
});

// Products belong to many Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // The intermediate model for the many-to-many relationship
  foreignKey: 'product_id', // The foreign key in the ProductTag model that associates Product with Tag
});

// Tags belong to many Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // The intermediate model for the many-to-many relationship
  foreignKey: 'tag_id', // The foreign key in the ProductTag model that associates Tag with Product
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
