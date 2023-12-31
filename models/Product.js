// Import necessary modules and dependencies from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize the Product model by extending off Sequelize's Model class
class Product extends Model {}

// Defining and set up fields and rules for the Product model
Product.init(
    {
        // Define the id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,      // The id cannot be null
            primaryKey: true,      // It's the primary key
            autoIncrement: true    // It auto-increments
        },
        // Define the product_name column, which stores product names
        product_name: {
            type: DataTypes.STRING,
            allowNull: false       // The product_name cannot be null
        },
        // Define the price column, which stores product prices as DECIMAL(10,2)
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true    // Validate that the price is a decimal number
            }
        },
        // Define the stock column, which stores product stock quantities
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,      // Default value for stock is 10
            validate: {
                isNumeric: true     // Validate that the stock is a numeric value
            }
        },
        // Define the category_id column as a foreign key referencing the category model
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "category", // References the "category" model
                key: "id"          // References the "id" field in the "category" model
            }
        }
    },
    {
        // Pass the sequelize instance for database connection
        sequelize,
        timestamps: false,       // Don't create createdAt and updatedAt columns
        freezeTableName: true,   // Use the model name as the table name
        underscored: true,      // Use snake_case for column names
        modelName: 'product',   // Set the model name to 'product'
    }
);

// Export the Product model for use in other parts of the application
module.exports = Product;
