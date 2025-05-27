// authContext.jsx
import { createContext, useContext, useState } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.getCurrentUser());

    const login = async (credentials) => {
        const result = await authService.login(credentials);
        setUser(result.user);
        return result;
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
