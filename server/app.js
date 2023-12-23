// app.js
require('dotenv').config({path: "./.env"});
// Reorganizing imports and setups
const express = require('express');
const mustacheExpress = require('mustache-express');
const dbconnect = require('./src/config/db');
const apiRoutes = require('./src/routes/apiRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const path = require('path');
const cors = require('cors')

//Connect to database
dbconnect()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Setting up Mustache as the view engine
const parentPath = path.resolve(__dirname, '../client', 'src', 'views');
const parentPath2 = path.resolve(__dirname, '../client', 'src', 'public');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', parentPath, '/client');
app.use(express.static(parentPath2));

// Implementing structured route handling
app.use('/api', apiRoutes);
app.use('/', clientRoutes);

// Error handling and fallback routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Internal Server Error');
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
