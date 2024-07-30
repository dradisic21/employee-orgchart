import axios from "axios";

const apiUrl = 'http://localhost:8001/api/employees';

export async function getEmployees(page = 1) {
    try {
        const response = await axios.get(`${apiUrl}?page=${page}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}

export const searchEmployees = async (searchTerm) => {
    const response = await axios.get(`${apiUrl}?search=${searchTerm}`);
    return response.data;
  };