const express = require('express');
const helmet = require('helmet');

const app = express();

// Use the helmet.hidePoweredBy() middleware to remove X-Powered-By header
app.use(helmet.hidePoweredBy());

// ...other middleware and routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
