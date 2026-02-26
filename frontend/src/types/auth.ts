export interface User {
    id: number;
    name: string;
    email: string;
    bio?: string | null;

    location_city?: string | null;
    location_state?: string | null;
    location_country?: string | null;
    graduation_level?: string | null;
    workplace?: string | null;

    instagram_link?: string | null;
    email_link?: string | null;
    custom_link?: string | null;

    show_location?: boolean;
    show_graduation?: boolean;
    show_workplace?: boolean;
    show_socials?: boolean;

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
