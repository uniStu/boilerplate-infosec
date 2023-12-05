const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 3000;

const app = express();

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
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
      scriptSrc: ["'self'", 'code.jquery.com'],
    },
  })
);

// Configure Helmet using the 'parent' helmet() middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable the default contentSecurityPolicy
    frameguard: {
      action: 'deny',
    },
    // ...other configurations
  })
);

// Understand BCrypt hashes
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
bcrypt.genSalt(saltRounds, (err, salt) => {
  bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
    // Store hash in your password DB.
    bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
      // result == true
    });
  });
});

// Hash and compare passwords asynchronously
async function hashAndComparePasswords() {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);
  const result = await bcrypt.compare(myPlaintextPassword, hash);
  // result == true
}

// Hash and compare passwords synchronously
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
const result = bcrypt.compareSync(myPlaintextPassword, hash);
// result == true

// ...other middleware and routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3690;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
