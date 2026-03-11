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
            // Enviando o arquivo DIRETAMENTE para o Render para desviar das pesadas Limitações de Vercel
            // (4.5 MB Limit e timeouts). Usando a string hardcoded para o Modo Apresentação:
            const response = await fetch("https://bioativa-api.onrender.com/api/v1/upload", {
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
