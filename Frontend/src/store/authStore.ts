import axios, { isAxiosError } from 'axios';
import { create } from 'zustand';
type UserTypes = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface AuthStoreTypes {
    user: null | UserTypes;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: null | string;
    isCheckingAuth: boolean;
    signup: (name: string, email: string, password: string, confirmPassword: string) => void;
    verifyEmail: (code: string) => void;
}
const API_URL = `http://localhost:3000/api/auth`;
axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStoreTypes>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    // start the function
    signup: async(name, email, password, confirmPassword) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password,
                confirmPassword,
            });
            set({ isLoading: false, user: response.data.user, error: null, isAuthenticated: true });
        } catch (error: unknown) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error });
                    throw error;
                }
            }
        }
    },
    verifyEmail: async(code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {
                code
            });
            set({ isLoading: false, user: response.data?.user, error: null, isAuthenticated: true });
            return response.data;
        } catch (error) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error,  });
                    throw error;
                }
            }
        }
    }
}));