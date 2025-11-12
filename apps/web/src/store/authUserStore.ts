import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '@/types/user-account';

interface AuthUserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthUserActions {
  setUser: (user: IUser | null) => void;
  updateUser: (updatedUser: Partial<IUser>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
  login: (user: IUser) => void;
  logout: () => void;
}

type AuthUserStore = AuthUserState & AuthUserActions;

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        });
      },

      updateUser: (updatedUser) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updatedUser },
            error: null,
          });
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      login: (user) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-user-storage', // unique name for localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // only persist user and isAuthenticated, not loading states
    }
  )
);

// Selectors for easier access to specific parts of the state
export const useAuthUser = () => useAuthUserStore((state) => state.user);
export const useIsAuthenticated = () => useAuthUserStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthUserStore((state) => state.isLoading);
export const useAuthError = () => useAuthUserStore((state) => state.error);
