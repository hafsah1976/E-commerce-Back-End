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
            allowNull: false,      
            primaryKey: true,      
            autoIncrement: true   
        },
        // Define the product_id column as a foreign key referencing the product model
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "product",
                key: "id"         
            }
        },
        // Define the tag_id column as a foreign key referencing the tag model
        tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "tag",  
                key: "id"      
            }
        }
    },
    {
        // Pass the sequelize instance for database connection
        sequelize,
        timestamps: false,       
        freezeTableName: true,  
        underscored: true,      
        modelName: 'product_tag',
    }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
