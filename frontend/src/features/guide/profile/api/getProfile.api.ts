import api from '@/lib/axios';
export const getProfile = async () => {
    const response = await api.get("/guide/profile");
    return response.data.data;
}