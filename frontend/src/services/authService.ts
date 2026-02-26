import { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth';

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Chamando o Route Handler do Next.js (mesmo domínio)
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { response: { data } };
        }

        return data; // O cookie HttpOnly já foi setado pelo servidor
    },

    async register(data: RegisterData): Promise<User> {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw { response: { data: responseData } };
        }

        return responseData;
    },

    async logout(): Promise<void> {
        await fetch('/api/auth/logout', { method: 'POST' });
        // Opcional: Redirecionar para home após isso
    },

    async getCurrentUser(): Promise<User> {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
            throw new Error("Não autenticado");
        }
        return await response.json();
    },

    // Apenas um flag temporário agora, a real checagem é feita por getCurrentUser
    isAuthenticated(): boolean {
        // Num fluxo com HttpOnly, o cliente não "sabe" se o token existe. 
        // A melhor forma é confiar se getCurrentUser retorna sucesso ou erro.
        // Simulando que sempre deve tentar validar:
        return true;
    }
};
