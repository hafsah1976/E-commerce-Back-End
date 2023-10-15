//modularizing routes helps breaking down the application's routes into separate modules. where each module is responsible for a specific set of routes. 
//This approach helps in maintaining a clean and organized codebase and allows for better code reuse. 
//in this application the route modules are category-routes, product-routes and tag-routes.

// Import necessary modules and sub-routers
const router = require('express').Router();
const categoryRoutes = require('./category-routes'); // Import routes related to categories
const productRoutes = require('./product-routes'); // Import routes related to products
const tagRoutes = require('./tag-routes'); // Import routes related to tags

// Use the sub-routers for specific routes under their respective base paths
router.use('/categories', categoryRoutes); // Use the categoryRoutes for routes under '/categories'
router.use('/products', productRoutes); // Use the productRoutes for routes under '/products'
router.use('/tags', tagRoutes); // Use the tagRoutes for routes under '/tags'

module.exports = router; // Export the main router to be used by the application
