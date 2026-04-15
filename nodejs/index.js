const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const server = express();

// Enable CORS for frontend on localhost:5173 (Vite default port)
server.use(cors({
  origin: 'http://localhost:5173'
}));

// Parse JSON bodies
server.use(express.json());

// Serve static files from the 'dist' folder
server.use(express.static(path.resolve(__dirname, 'dist')));

// Connect to MongoDB
main().catch(err => console.error(err));
async function main() {
  await mongoose.connect('mongodb+srv://vamsi:<db_password>@cluster0.pyzargz.mongodb.net/');
  console.log("✅ Database connected");
}

// Product router
const productRouter = require('./router/product');
server.use('/api', productRouter.router);

// Catch-all route for React frontend (SPA routing)
server.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
server.listen(8080, () => {
  console.log("✅ Server running at http://localhost:8080");
});
