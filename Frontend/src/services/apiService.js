import axios from 'axios';

const API_URL = 'http://localhost:8080/api';


export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}/{id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchRecipes = async function fetchRecipes(id,ingredients) {
    try {
        alert('Processing...');
        const response = await axios.post(`${API_URL}/recipes/${id}`, ingredients);
        alert('Received ingredients');
        return response.data;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        alert('Failed to fetch recipes. Please try again.');
        throw error;
    }
}
