const { pool } = require('../config/db');

// Fetch all todos [cite: 6]
const getTodos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY created_at ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add a new todo [cite: 6]
const addTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ msg: 'Title is required' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO todos (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a todo [cite: 7]
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.json({ msg: 'Todo deleted successfully', deletedTodo: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update a todo (Example for edit functionality)
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const result = await pool.query(
            'UPDATE todos SET title = COALESCE($1, title), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
            [title, completed, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
};
