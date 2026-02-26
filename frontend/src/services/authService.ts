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
    },

    async deleteAccount(password: string): Promise<void> {
        const response = await fetch('/api/auth/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw { response: { data } };
        }
    },

    async updateProfile(data: Partial<User>): Promise<User> {
        // Envia direto via api proxy (requer Auth) ou criamos wrapper Next.js
        // Neste caso, vamos usar o proxy local do next configurado em apl/api/proxy/[...path]/route.ts
        const response = await fetch('/api/proxy/api/v1/auth/me', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Erro ao atualizar perfil");
        }
        return await response.json();
    },

    async getPublicProfile(id: number | string): Promise<User> {
        const response = await fetch(`/api/proxy/api/v1/auth/${id}`);
        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }
        return await response.json();
    }
};
