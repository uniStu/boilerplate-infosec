const express = require('express');
const helmet = require('helmet');

const app = express();

// Use the helmet.hidePoweredBy() middleware to remove X-Powered-By header
app.use(helmet.hidePoweredBy('power'));

// ...other middleware and routes

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
