// Import required modules and dependencies
const express = require('express'); // Import the Express.js framework
const routes = require('./routes'); // Import your application's routes
const sequelize = require('./config/connection'); // Import the Sequelize connection

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Middleware configuration
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Use the defined routes for handling HTTP requests
app.use(routes);

// Synchronize Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
