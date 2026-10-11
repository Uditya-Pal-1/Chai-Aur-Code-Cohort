import axios from 'axios';
const API_URL = '/api/Todo';

const todoService = {
    
    getAllTodos: async () => {
        try{
            const response = await axios.get(API_URL)
            return response.data;
        }catch(error) {
            throw new Error(error.response?.data?.error || "Failed to fetch todos")
        }
    },

    getTodoById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || 'Failed to fetch todo')
        }
    },

    createTodo: async (todo) => {
        try {
            const response = await axios.post(API_URL, todo);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Failed to create todo")
        }
    },

    updateTodo: async (id, updates) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updates);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Failed to update todo")
        }
    },

    deleteTodo: async (id) => {
        try{
            const response = await axios.delete(`${API_URL}/${id}`)
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.error || "Failed to delete todo")
        }
    },

    toggleRecorded: async (id, isRecorded) => {
        try{
            const response = await axios.put(`${API_URL}/${id}`, {isRecorded})
            return response.data;
        }catch(error){
            throw new Error(error.response?.data?.error || "Failed to toggle recorded status")
        }
    }
};

export default todoService;

