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
            // Utilizamos 'fetch' nativo porque o Axios sobrescreve globals e muitas vezes destrói 
            // a Fronteira de dados Multi-parte gerada unicamente pelo navegador ("boundary=---xyz").
            const response = await fetch("/api/proxy/api/v1/upload", {
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
