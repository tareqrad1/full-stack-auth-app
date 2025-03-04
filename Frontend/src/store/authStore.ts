import axios, { isAxiosError } from 'axios';
import { create } from 'zustand';
type UserTypes = {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    lastLogin: Date;
    createdAt: Date | number | string;
}
interface AuthStoreTypes {
    user: null | UserTypes;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: null | string;
    isCheckingAuth: boolean;
    message: null | string;
    signup: (name: string, email: string, password: string, confirmPassword: string) => void;
    verifyEmail: (code: string) => void;
    signin: (email: string, password: string) => void;
    signout: () => void;
    checkAuth: () => void;
    forgotPassword: (email: string) => void;
    resetPassword: (token: string | undefined, password: string) => void;
};
const API_URL = `http://localhost:3000/api/auth`;
axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStoreTypes>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    message: null,

    signup: async(name, email, password, confirmPassword) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name,
                email,
                password,
                confirmPassword,
            });
            set({ isLoading: false, user: response.data?.user, error: null, isAuthenticated: true });
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
                    set({ isLoading: false, error: error.response?.data.error  });
                    throw error;
                }
            }
        }
    },
    signin: async(email, password) => {
        set({ isLoading: true, error: null, isAuthenticated: true });
        try {
            const response = await axios.post(`${API_URL}/signin`, {
                email,
                password
            }, {withCredentials: true});            
            set({ isLoading: false, user: response.data?.user, error: null, isAuthenticated: true });
        } catch (error) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error  });
                    throw error;
                }
            }
        }
    },
    signout: async() => {
        set({ isLoading: true, error: null, isAuthenticated: true });
        try {
            await axios.post(`${API_URL}/signout`);
            set({ isLoading: false, user: null, error: null, isAuthenticated: false });
        } catch (error) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error.response?.data.error  });
                    throw error;
                }
            }
        }
    },
    checkAuth: async() => {
        set({ isLoading: true, isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/me`);
            set({ isLoading:false, user: response?.data?.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error: unknown) {
            console.log(error);
            if(error instanceof Error) {
                set({ isLoading: false, error: null, user: null, isAuthenticated: false, isCheckingAuth: false });
                throw error;
            }
        }
    },
    forgotPassword: async(email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ isLoading: false, message: response.data.message  });
        } catch (error: unknown) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error?.response?.data.error, user: null, isAuthenticated: false, isCheckingAuth: false });
                    throw error;
                }
            }
        }
    },
    resetPassword: async(token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ isLoading: false, message: response.data.message });
        } catch (error: unknown) {
            console.log(error);
            if(isAxiosError(error)){
                if(error instanceof Error) {
                    set({ isLoading: false, error: error?.response?.data.error, user: null, isAuthenticated: false, isCheckingAuth: false });
                    throw error;
                }
            }
        }
    },
}));
