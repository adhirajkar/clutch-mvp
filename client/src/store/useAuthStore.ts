import { create } from "zustand";

interface User {
    _id: string;
    email: string;
    role: string;
    name?: string;
    profilePicture?: string;
}

interface AuthStore {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
    }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
    },
}))