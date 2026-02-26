"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
        } catch (error: any) {
            if (error?.message !== "Não autenticado") {
                console.error('Failed to authenticate user', error);
            }
            // Se houve erro na autênticação (ex: token inválido/expirado que o middleware deixou passar),
            // O cookie preso no navegador deve ser purgado silenciosamente, permitindo acesso ao /login
            await authService.logout().catch(() => { });
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (token: string, userData: User) => {
        // Note: token is already set in cookies by authService.login
        setUser(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
