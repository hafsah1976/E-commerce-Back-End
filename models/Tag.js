// Import necessary modules and dependencies from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize the Tag model by extending off Sequelize's Model class
class Tag extends Model {}

// Defining and set up columns and rules for the Tag model
Tag.init(
  {
    // Defining the id column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,       // It's the primary key
      allowNull: false,      // It cannot be null
      autoIncrement: true   // It auto-increments
    },
    // Defining the tag_name column, which stores tag names
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    // Passing the sequelize instance for database connection
    sequelize,
    timestamps: false,       // Don't create createdAt and updatedAt columns
    freezeTableName: true,   // Use the model name as the table name
    underscored: true,       // Use snake_case for column names
    modelName: 'tag',        // Set the model name to 'tag'
  }
);

// Export the Tag model for use in other parts of the application
module.exports = Tag;