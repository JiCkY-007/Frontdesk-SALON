import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const fetchItems = () => API.get('/items');
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.put(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);