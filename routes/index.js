const router = require('express').Router();
const apiRoutes = require('./api');


// Include the API routes defined in the 'apiRoutes' module
router.use('/api', apiRoutes);

// If the route doesn't match any API routes, respond with a "Wrong Route!" message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router; // Export the router for use in other parts of the application