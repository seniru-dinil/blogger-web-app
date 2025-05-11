"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Role = "ROLE_PUBLISHER" | "ROLE_VISITOR";

type authData = {
  isAuthenticated: boolean;
  role: Role[];
  email: string;
  id: number;
};

interface AuthContextType {
  id: number;
  email: string;
  isAuthenticated: boolean;
  role: Role[];
  setAuth: (authData: authData) => void;
}

const AuthContext = createContext<AuthContextType>({
  email: "",
  isAuthenticated: false,
  role: ["ROLE_VISITOR"],
  setAuth: () => {},
  id: 0,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [auth, setAuth] = useState<authData>({
    isAuthenticated: false,
    role: ["ROLE_VISITOR"],
    email: "",
    id: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_role: Role[] = JSON.parse(
      localStorage.getItem("role") || "[]"
    ) as Role[];

    if (!token) {
      router.replace("/login");
    } else {
      setAuth({
        isAuthenticated: true,
        role: user_role,
        email: "",
        id: 0,
      });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("AUTH CHANGED", auth);
  }, [auth]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 p-8">
        <Skeleton className="h-[70px] w-[200px] " />
        <div className="space-y-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
