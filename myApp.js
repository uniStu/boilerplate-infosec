const express = require('express');
const app = express();
const helmet = require('helmet');
const bcrypt = require('bcrypt');

// Install and require Helmet
app.use(helmet());

// Hide potentially dangerous information
app.use(helmet.hidePoweredBy());

// Mitigate the risk of clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Mitigate the risk of XSS attacks
app.use(helmet.xssFilter());

// Avoid inferring the response MIME type
app.use(helmet.noSniff());

// Prevent IE from opening untrusted HTML
app.use(helmet.ieNoOpen());

// Ask browsers to access your site via HTTPS only (with a max age of 90 days)
app.use(
  helmet.hsts({
    maxAge: 90 * 24 * 60 * 60, // 90 days
    includeSubDomains: true,
    preload: true,
  })
);

// Disable DNS prefetching
app.use(helmet.dnsPrefetchControl());

// Disable client-side caching
app.use(helmet.noCache());

// Set a Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
     directives: {
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", 'trusted-cdn.com'], // Allow scripts from the same origin and trusted-cdn.com
    },
  })
);

const bcrypt = require('bcrypt');
const saltRounds = 10; // Use a suitable number of rounds

// Asynchronous hashing function
bcrypt.hash('passw0rd!', saltRounds, (err, hash) => {
  console.log(hash); // Print the generated hash
  // Store the hash in your database or perform other actions with it
  // Example: saveHashToDatabase(hash);
  
  // Compare a plaintext password with the generated hash
  bcrypt.compare('passw0rd!', hash, (err, res) => {
    console.log(res); // Print 'true' or 'false' based on comparison
  });
});















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
