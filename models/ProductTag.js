// Import necessary modules and dependencies from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize the ProductTag model by extending off Sequelize's Model class
class ProductTag extends Model {}

// Define and set up columns and rules for the ProductTag model
ProductTag.init(
    {
        // Define the id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,      // The id cannot be null
            primaryKey: true,      // It's the primary key
            autoIncrement: true    // It auto-increments
        },
        // Define the product_id column as a foreign key referencing the product model
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "product", // References the "product" model
                key: "id"          // References the "id" field in the "product" model
            }
        },
        // Define the tag_id column as a foreign key referencing the tag model
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "tag",  // References the "tag" model
                key: "id"      // References the "id" field in the "tag" model
            }
        }
    },
    {
        // Pass the sequelize instance for database connection
        sequelize,
        timestamps: false,       // Don't create createdAt and updatedAt columns
        freezeTableName: true,   // Use the model name as the table name
        underscored: true,       // Use snake_case for column names
        modelName: 'product_tag', // Set the model name to 'product_tag'
    }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;