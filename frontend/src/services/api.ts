import axios from 'axios';
import { User, UserInput } from '../types/user';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/login', { email, password });
        const { token } = response.data.authorization;
        localStorage.setItem('token', token);
        return response.data;
    },
    
    getUsers: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data.users;
    },

    getUser: async (id: number): Promise<User> => {
        const response = await api.get(`/users/${id}`);
        return response.data.user;
    },

    createUser: async (user: UserInput): Promise<User> => {
        const response = await api.post('/users', user);
        return response.data.user;
    },

    updateUser: async (id: number, user: Partial<UserInput>): Promise<User> => {
        const response = await api.put(`/users/${id}`, user);
        return response.data.user;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/users/${id}`);
    },
};