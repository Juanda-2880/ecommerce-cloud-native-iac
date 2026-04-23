const API_URL = '/api';

export const getProfileService = async () => {
    // Implement profile retrieval logic if needed
}

export const LoginService = async (credentials) => {
    // Implement login logic if needed
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
    // Implement logout logic if needed
}
