import axios from 'axios';

const API_URL = '/api/payments';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };
};

export const createPaymentPreference = async (orderData) => {
    const response = await axios.post(`${API_URL}/create_preference`, orderData, getAuthHeaders());
    return response.data;
};
