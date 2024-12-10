// Import the Express module
import express from 'express';

// Create an Express application
const app = express();

// Define a port number
const PORT = 3000;

// Set up a route to respond with "Hello, World!"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
