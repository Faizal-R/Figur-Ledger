"use client";

import { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "@/store/authUserStore";

export function withRole<P extends object>(
  Component:ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const token = useAuthUserStore((s) => s.token);
    const user = useAuthUserStore((s) => s.user);

    useEffect(() => {
      if (!token) {
        router.replace("/login");
        return;
      }

      if (!user) {
        router.replace("/login");
        return;
      }

    
      if (!allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
        return;
      }
    }, [token, user]);

    // Avoid flicker: Wait until both token + user are present
    if (!token || !user) return null;

    return <Component {...props} />;
  };
}
