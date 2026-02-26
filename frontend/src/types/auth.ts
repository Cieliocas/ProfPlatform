export interface User {
    id: number;
    name: string;
    email: string;
    bio?: string | null;
    created_at?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    bio?: string;
}
