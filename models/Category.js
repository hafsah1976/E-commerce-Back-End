// Importing the necessary modules and dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Defining the Category model class
class Category extends Model {}

// Initialize the Category model with its properties
Category.init(
  {
    // Define the primary key column for the Category model
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,       // The column cannot be null
      primaryKey: true,       // It is the primary key
      autoIncrement: true     // It auto-increments for each new record
    },
    // Define the category_name column, which stores category names
    category_name: {
      type: DataTypes.STRING,
      allowNull: false       // The category name cannot be null
    }
  },
  {
    // Pass the sequelize instance for database connection
    sequelize,
    timestamps: false,        // Disable timestamps (createdAt and updatedAt)
    freezeTableName: true,    // Prevent Sequelize from pluralizing the table name
    underscored: true,       // Use snake_case for column and table names
    modelName: 'category',   // Model name for referencing elsewhere in the code
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;
