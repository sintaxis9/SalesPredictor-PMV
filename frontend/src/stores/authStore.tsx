import { create } from 'zustand';

interface User {
  email: string;
}

interface AuthStore {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('user') || null) 
    : null,

  login: (email: string) => {
    localStorage.setItem('user', JSON.stringify({ email }));
    set({ user: { email } });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
  
  register: (email: string) => {
    localStorage.setItem('user', JSON.stringify({ email }));
    set({ user: { email } });
  }
}));

export default useAuthStore;