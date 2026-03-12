import api from '@/src/lib/api';

export interface AttachmentResponse {
    file_name: string;
    file_type: string;
    file_url: string;
}

export const uploadService = {
    async uploadFile(file: File): Promise<AttachmentResponse> {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const isLocalhost = typeof window !== "undefined" && (
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1"
            );

            const uploadUrl = isLocalhost
                ? "/api/proxy/api/v1/upload"
                : "https://bioativa-api.onrender.com/api/v1/upload";

            // Em producao (Vercel), enviar diretamente ao Render evita limites de upload.
            // Em localhost, usa o proxy do Next para falar com o backend local.
            const response = await fetch(uploadUrl, {
                method: "POST",
                // O Fetch entende o FormData nativo do navegador
                body: formData,
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.detail || `Upload File Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao enviar o arquivo (Fetch):", error);
            throw error;
        }
    }
};
