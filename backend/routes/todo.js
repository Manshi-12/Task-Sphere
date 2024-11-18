const express = require('express');
const Todo = require('../models/Todo');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// GET all todos
router.get('/', verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// POST a new todo
router.post('/', verifyToken, async (req, res) => {
    const { title, description, priority } = req.body;

    // Validate input
    if (!title || !description || !priority) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newTodo = new Todo({
            title,
            description,
            priority,
            userId: req.userId,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});

// PUT update a todo
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, priority, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            title,
            description,
            priority,
            completed,
        }, { new: true });

        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});

// DELETE a todo
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

module.exports = router;
