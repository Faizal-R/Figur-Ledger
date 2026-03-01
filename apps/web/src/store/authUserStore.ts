import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  id: string;
  email: string;
  role: string;
  phone: string;
}

interface AuthStore {
  token: string | null;
  user: AuthUser | null;

  setToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthUserStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-user-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);

export const useAuthUser = () => useAuthUserStore((s) => s.user);
export const useIsAuthenticated = () => useAuthUserStore((s) => !!s.token);
export const useAuthLoading = () => false;
export const useAuthError = () => null;
