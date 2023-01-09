const path = require('path');
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const { startKafkaProducer } = require('./connectors/kafka');

// Config setup to parse JSON payloads from HTTP POST request body
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Register the api routes
apiRoutes(app);

// If request doesn't match any of the above routes then return 404
app.use((req, res, next) => {
  return res.status(404).json({
    message: 'Not Found',
  })
});

// Create HTTP Server and Listen for Requests
app.listen(3009, async (req, res) => {
  console.log("http://localhost:3009")
  await startKafkaProducer();
});