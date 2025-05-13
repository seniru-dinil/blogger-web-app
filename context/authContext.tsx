"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type Role = "ROLE_PUBLISHER" | "ROLE_VISITOR";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }
  }, [isClient]);

  return <>{children}</>;
};
