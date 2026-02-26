import api from '../lib/api';

export const experienceService = {
    async createExperience(data: any): Promise<any> {
        const response = await api.post('/api/v1/experiences/', data);
        return response.data;
    },
    async fetchExperiences(authorId?: number): Promise<any[]> {
        const url = authorId ? `/api/v1/experiences/?author_id=${authorId}` : '/api/v1/experiences/';
        const response = await api.get(url);
        return response.data;
    },

    async deleteExperience(id: number): Promise<void> {
        const response = await api.delete(`/api/v1/experiences/${id}`);
        return response.data;
    },

    async getExperienceById(id: string | number): Promise<any> {
        const response = await api.get(`/api/v1/experiences/${id}`);
        return response.data;
    }
};
