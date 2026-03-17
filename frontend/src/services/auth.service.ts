import { api } from '@/lib/axios';
import type { SignupData, Profile } from '@/types/user';

export const authService = {
  // Signup
  signup: async (data: SignupData): Promise<{ id: string; message: string }> => {
    const response = await api.post('/users/signup', data);
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<Profile> => {
    const response = await api.get<Profile>('/users/me');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<Profile> => {
    const response = await api.get<Profile>(`/users/${id}`);
    return response.data;
  },

  // List all users (admin only)
  listUsers: async (): Promise<Profile[]> => {
    const response = await api.get<Profile[]>('/users');
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
