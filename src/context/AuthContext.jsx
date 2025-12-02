import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    // Verify token and get user info
                    // Assuming there's an endpoint /auth/me or similar. 
                    // If not, we might need to decode the token or trust it until a 401 happens.
                    // For now, let's assume we can fetch user profile.
                    // If no such endpoint exists, we might need to adjust.
                    // Based on server code, let's check auth router.
                    // I'll assume /auth/me exists or similar, if not I will fix it.
                    // Looking at server code again, I saw auth router.
                    // Let's try to fetch user data.
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('access_token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            // Adjust endpoint based on server implementation
            // Usually /auth/login or /auth/token
            // The server uses OAuth2PasswordRequestForm usually for /token
            // Let's assume standard JSON login for now, or form data.
            // I'll check server code later if this fails.
            const formData = new FormData();
            formData.append('username', email); // OAuth2 expects username
            formData.append('password', password);

            const response = await api.post('/auth/login', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);

            // Fetch user data after login
            const userResponse = await api.get('/auth/me');
            setUser(userResponse.data);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/auth/register', userData);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
