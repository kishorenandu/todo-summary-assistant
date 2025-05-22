import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const todoApi = axios.create({
    baseURL: `${API_URL}/todos`,
});

const summaryApi = axios.create({
    baseURL: `${API_URL}/summarize`,
});

export const getTodos = () => todoApi.get('/');
export const addTodo = (title) => todoApi.post('/', { title });
export const deleteTodo = (id) => todoApi.delete(`/${id}`);
export const updateTodo = (id, data) => todoApi.put(`/${id}`, data);

export const summarizeAndSendToSlack = () => summaryApi.post('/');
