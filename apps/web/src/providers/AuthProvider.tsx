"use client";

import { useEffect, useState } from "react";
import { useAuthUserStore } from "@/store/authUserStore";
import request from "@/config/client";
import { AuthRoutes } from "@/constant/api/routes/authRoutes";
import { httpMethods } from "@/constant/api/enums/api";
import { ApiResponse } from "@/types/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const setToken = useAuthUserStore((s) => s.setToken);
  const token = useAuthUserStore((s) => s.token);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        try {
          const refreshRes = await request<
            ApiResponse<{ accessToken: string }>
          >(httpMethods.POST, AuthRoutes.REFRESH_TOKEN);

          const newToken = refreshRes.data.accessToken;
          setToken(newToken);
        } catch (err) {
          console.log("No session found");
        }
      }
      setLoading(false);
    };

    bootstrap();
  }, []);

  if (loading) return null;

  return children;
}
