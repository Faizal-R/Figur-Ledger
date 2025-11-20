"use client";

import { useEffect, useState } from "react";
import { useAuthUserStore } from "@/store/authUserStore";
import request from "@/config/client";
import { AuthRoutes } from "@/constant/api/routes/authRoutes";
import { httpMethods } from "@/constant/api/enums/api";

export function AuthProvider({ children }:{children:React.ReactNode}) {
  const [loading, setLoading] = useState(true);
  const setToken = useAuthUserStore((s) => s.setToken);
  const token = useAuthUserStore((s) => s.token);

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        try {
          const res = await request(httpMethods.POST, AuthRoutes.REFRESH_TOKEN);
          const accessToken = res.data.accessToken;
          setToken(accessToken);
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
