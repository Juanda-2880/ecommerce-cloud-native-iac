import axios from 'axios';

const API_URL = '/api/products';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        },
        withCredentials: true
    };
};

export const createProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/`, productData, getAuthHeaders());
    return response.data;
};

export const getAllProducts = async (filters = {}) => {
    const { search } = filters;
    let url = `${API_URL}/`;
    if (search) url += `?search=${search}`;
    const response = await axios.get(url);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const getSellerProducts = async (filters = {}) => {
    const { search, is_published } = filters;
    let url = `${API_URL}/seller?`;
    if (search) url += `search=${search}&`;
    if (is_published !== undefined) url += `is_published=${is_published}`;
    
    const response = await axios.get(url, getAuthHeaders());
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeaders());
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};
