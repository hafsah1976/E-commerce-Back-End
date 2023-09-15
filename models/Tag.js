// Import necessary modules and dependencies from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import our database connection from config.js
const sequelize = require('../config/connection.js');

// Initialize the Tag model by extending off Sequelize's Model class
class Tag extends Model {}

// Define and set up columns and rules for the Tag model
Tag.init(
  {
    // Define the id column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,       
      allowNull: false,      
      autoIncrement: true 
    },
    // Define the tag_name column, which stores tag names
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    // Pass the sequelize instance for database connection
    sequelize,
    timestamps: false,       
    freezeTableName: true,   
    underscored: true,       
    modelName: 'tag',        
  }
);

// Export the Tag model 
module.exports = Tag;
