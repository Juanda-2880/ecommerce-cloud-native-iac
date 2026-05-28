import axios from 'axios';

const API_URL = '/api/orders';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };
};

export const placeOrder = async (orderData) => {
    const response = await axios.post(`${API_URL}/`, orderData, getAuthHeaders());
    return response.data;
};

export const getOrderHistory = async () => {
    const response = await axios.get(`${API_URL}/history`, getAuthHeaders());
    return response.data;
};
