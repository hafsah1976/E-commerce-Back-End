// for my understanding 
require('dotenv').config();//Import the 'dotenv' library and load configuration from a .env file if it exists

// Import Sequelize, which is a Node.js ORM (Object-Relational Mapping) for SQL databases
const Sequelize = require('sequelize');

// Create a new Sequelize instance and set up the database connection
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // If JAWSDB_URL environment variable is present, use it as the database connection URL
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',               // Set the host where your database is located
      dialect: 'mysql',                // Set the dialect (in this case, MySQL)
      dialectOptions: {
        decimalNumbers: true,          // Enable support for decimal numbers
      },
    });

// Export the configured sequelize instance for use
module.exports = sequelize;
