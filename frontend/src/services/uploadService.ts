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
            const response = await api.post("/api/v1/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
            throw error;
        }
    }
};
