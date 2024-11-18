const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Import authentication routes
app.use('/api/auth', authRoutes);

// Import todo routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
