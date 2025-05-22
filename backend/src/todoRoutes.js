const express = require('express');
const { getTodos, addTodo, deleteTodo, updateTodo } = require('../controllers/todoController');
const router = express.Router();

router.get('/', getTodos); // GET /todos [cite: 6]
router.post('/', addTodo); // POST /todos [cite: 6]
router.delete('/:id', deleteTodo); // DELETE /todos/:id [cite: 7]
router.put('/:id', updateTodo); // Assuming you'll add an update functionality

module.exports = router;
