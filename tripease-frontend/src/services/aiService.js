import axiosInstance from '../api/axiosInstance';

class AIService {
    // Generate travel recommendation using backend Gemini integration
    async generateRecommendation(destination, budgetRange, preferences) {
        try {
            const response = await axiosInstance.post('/ai/recommendation', {
                destination,
                budgetRange,
                preferences
            });
            return response.data;
        } catch (error) {
            console.error('Error generating recommendation:', error);
            throw error;
        }
    }

    // Get all user recommendations
    async getUserRecommendations() {
        try {
            const response = await axiosInstance.get('/ai/recommendations');
            return response.data;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            throw error;
        }
    }

    // Get recommendation by ID
    async getRecommendationById(id) {
        try {
            const response = await axiosInstance.get(`/ai/recommendations/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching recommendation:', error);
            throw error;
        }
    }

    // Delete recommendation
    async deleteRecommendation(id) {
        try {
            await axiosInstance.delete(`/ai/recommendations/${id}`);
            return true;
        } catch (error) {
            console.error('Error deleting recommendation:', error);
            throw error;
        }
    }
}

export default new AIService();