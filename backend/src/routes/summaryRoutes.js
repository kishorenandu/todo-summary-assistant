const express = require('express');
const { pool } = require('../config/db');
const { summarizeTodos } = require('../services/llmService');
const { sendSlackMessage } = require('../services/slackService');
const router = express.Router();

// POST /summarize [cite: 7]
router.post('/', async (req, res) => {
    try {
        // Fetch all pending todos from the database
        const result = await pool.query('SELECT title FROM todos WHERE completed = FALSE');
        const pendingTodos = result.rows;

        if (pendingTodos.length === 0) {
            return res.status(200).json({ message: 'No pending todos to summarize.' });
        }

        // Summarize using LLM [cite: 2, 9]
        const summary = await summarizeTodos(pendingTodos);

        // Send to Slack [cite: 3]
        await sendSlackMessage(summary);

        res.status(200).json({ success: true, message: 'Todos summarized and sent to Slack successfully!' });
    } catch (err) {
        console.error('Error in /summarize endpoint:', err.message);
        res.status(500).json({ success: false, message: err.message || 'Failed to summarize and send to Slack.' });
    }
});

module.exports = router;
