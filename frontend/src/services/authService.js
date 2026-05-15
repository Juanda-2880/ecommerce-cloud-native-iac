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

export const RegisterService = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('RegisterService error:', error);
        throw error;
    }
}

export const LogoutService = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}
