// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types/UserContext';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add an interface for the component's props to accept children
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Use a function to initialize state from localStorage only once
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('token');
    });

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    // --- Add the login and logout functions here ---
    const login = (userData: User, newToken: string) => {
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // It's a good practice to handle side effects like Axios interceptors
    // inside a useEffect hook to manage their lifecycle.
    React.useEffect(() => {
        const interceptor = axios.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Cleanup function to remove the interceptor when the component unmounts
        // or the token changes.
        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [token]); // The effect re-runs when the token changes

    // Create the value object to pass to the provider
    const value = {
        user,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};