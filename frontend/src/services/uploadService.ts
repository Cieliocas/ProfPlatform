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
            // Utilizamos 'fetch' nativo direto pro Render (sem passar pela Vercel Proxy) 
            // para destravar dois grandes males: 1) O Proxy da Vercel esmaga a formatação "Boundary" do Form-data
            // e 2) A Vercel Free limita Uploads a apenas 4.5MB (o que bloqueia fotografias de celular).
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const response = await fetch(`${API_URL}/api/v1/upload`, {
                method: "POST",
                // Não adicionamos Content-Type aqui propositalmente. O Fetch entende o FormData 
                // e insere o Content-Type Multi-Part correto e os divisores com "Boundary".
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
