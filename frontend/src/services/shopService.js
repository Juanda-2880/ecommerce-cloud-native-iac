const API_URL = '/api';

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const getCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return [];
    const response = await fetch(`${API_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
};

export const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Please login to add items to cart');
    const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
};

export const removeFromCart = async (cartItemId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
};

export const checkout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Checkout failed');
    return data;
};
