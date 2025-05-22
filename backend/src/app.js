require('dotenv').config();
const express = require('express');
const cors = require('cors'); // For cross-origin requests
const todoRoutes = require('./routes/todoRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to Database
connectDB();

// Routes
app.use('/todos', todoRoutes);
app.use('/summarize', summaryRoutes);

// Basic root route for testing
app.get('/', (req, res) => {
    res.send('Todo Summary Assistant Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
