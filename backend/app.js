const express = require('express');
const app = express();

// ... other imports and middleware
app.use('/uploads', express.static('uploads'));

module.exports = app; 