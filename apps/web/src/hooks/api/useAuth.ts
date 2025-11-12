import { AuthService } from "@/services/api/AuthService";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const login = useMutation({
    mutationFn: AuthService.login,
  });
  const register = useMutation({
    mutationFn: AuthService.register,
  });
  // const logout = useMutation({
  //   mutationFn: AuthService.logout,
  // });

  return { login, register };
};
