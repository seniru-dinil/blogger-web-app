"use client";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import SideBarRoutes from "./sidebar-routes";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    router.replace("/login");
  };
  return (
    <div className="flex flex-col  gap-6 pt-6  bg-white sm:w-full h-full">
      <Logo />
      <SideBarRoutes />
      <Button onClick={handleLogout} className="w-3/4 mx-auto mt-auto mb-6">
        <LogOut />
        Sign Out
      </Button>
    </div>
  );
}
