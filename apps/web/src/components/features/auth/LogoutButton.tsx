"use client";

import { Button } from "@/components/ui/buttons/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/api/useAuth";
import { useAuthUserStore } from "@/store";
import { toast } from "sonner";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const LogoutButton = ({ 
  variant = "outline", 
  size = "default", 
  className = "" 
}: LogoutButtonProps) => {
  const router = useRouter();
  // const { logout } = useAuth();
  const { clearAuth: clearUserFromStore } = useAuthUserStore();

  const handleLogout = async () => {
    try {
      // Clear user from store (local logout only since API is commented out)
      clearUserFromStore();
      
      // Navigate to login page
      router.push("/login");
      
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      
      // Even if something fails, clear local state
      clearUserFromStore();
      router.push("/login");
      
      toast.error("Logout failed, but you've been signed out locally.");
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      className={className}
      disabled={false}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};

export default LogoutButton;
