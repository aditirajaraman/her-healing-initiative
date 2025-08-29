// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add an interface for the component's props to accept children
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    // --- Add the login and logout functions here ---
    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };
    // -----------------------------------------------


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