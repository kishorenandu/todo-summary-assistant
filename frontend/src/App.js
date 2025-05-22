import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo, summarizeAndSendToSlack } from './api';
import './App.css'; // You'll create this CSS file

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null); // To store the todo being edited
    const [editTitle, setEditTitle] = useState('');
    const [slackMessage, setSlackMessage] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await getTodos(); // View list of current to-dos [cite: 4]
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        try {
            await addTodo(newTodo); // Add to-do items [cite: 3]
            setNewTodo('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id); // Delete to-do items [cite: 3]
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleToggleComplete = async (id, completed) => {
        try {
            await updateTodo(id, { completed: !completed });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleEditClick = (todo) => {
        setEditingTodo(todo.id);
        setEditTitle(todo.title);
    };

    const handleSaveEdit = async (id) => {
        if (!editTitle.trim()) return;
        try {
            await updateTodo(id, { title: editTitle }); // Edit to-do items [cite: 3]
            setEditingTodo(null);
            setEditTitle('');
            fetchTodos();
        } catch (error) {
            console.error('Error saving edit:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
        setEditTitle('');
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSlackMessage('');
        try {
            const response = await summarizeAndSendToSlack(); // Button to generate and send the summary [cite: 4]
            setSlackMessage(response.data.message); // Show a success/failure message [cite: 5]
            console.log(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to summarize and send to Slack.';
            setSlackMessage(`Error: ${errorMessage}`); // Show a success/failure message [cite: 5]
            console.error('Error summarizing:', error);
        } finally {
            setIsSummarizing(false);
            // Clear message after some time
            setTimeout(() => setSlackMessage(''), 5000);
        }
    };

    return (
        <div className="App">
            <h1>Todo Summary Assistant</h1>

            <form onSubmit={handleAddTodo} className="todo-form">
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>

            <button
                onClick={handleSummarize}
                disabled={isSummarizing || todos.length === 0}
                className="summarize-button"
            >
                {isSummarizing ? 'Summarizing...' : 'Summarize & Send to Slack'}
            </button>
            {slackMessage && <p className="slack-message">{slackMessage}</p>}

            <div className="todo-list">
                {todos.length === 0 ? (
                    <p>No todos yet! Add some to get started.</p>
                ) : (
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                                {editingTodo === todo.id ? (
                                    <div className="edit-mode">
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                        <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <span onClick={() => handleToggleComplete(todo.id, todo.completed)}>
                                            {todo.title}
                                        </span>
                                        <div className="actions">
                                            <button onClick={() => handleEditClick(todo)}>Edit</button>
                                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
