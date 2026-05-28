const API_URL = '/api';

export const getProfileService = async () => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
        return data;
    } catch (error) {
        console.error('getProfileService error:', error);
        throw error;
    }
}

export const LoginService = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    } catch (error) {
        console.error('LoginService error:', error);
        throw error;
    }
}

export const SignupService = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Signup failed');
        }

        // Auto-login after signup
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Empty the cart on new signup
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdate'));
        }

        return data;
    } catch (error) {
        console.error('SignupService error:', error);
        throw error;
    }
}

export const UpdateProfileService = async (profileData) => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(profileData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Update failed');

        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.error('UpdateProfileService error:', error);
        throw error;
    }
}

export const DeleteAccountService = async () => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Deletion failed');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return data;
    } catch (error) {
        console.error('DeleteAccountService error:', error);
        throw error;
    }
}

export const LogoutService = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Empty the cart on logout
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdate'));
}
