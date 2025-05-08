"use client";

import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";
import { SquarePen } from "lucide-react";
import { Role, useAuth } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const { role, setAuth } = useAuth();
  const isPublisher = role.includes("ROLE_PUBLISHER");
  function handleBecomePublisher() {
    const role: Role[] = ["ROLE_PUBLISHER", "ROLE_VISITOR"];
    localStorage.setItem("role", JSON.stringify(role));

    setAuth({
      isAuthenticated: true,
      role,
    });
  }

  function handleWrite() {
    router.push("/publisher/articles/create");
  }

  return (
    <div className="border-b-1 h-[70px] border-b-slate-50 flex items-center px-6 justify-between ">
      <MobileSidebar />
      {!pathName.split("/").includes("create") &&
        (isPublisher ? (
          <Button className=" ml-auto cursor-pointer" onClick={handleWrite}>
            <SquarePen />
            <p>Write</p>
          </Button>
        ) : (
          <Button
            className=" ml-auto cursor-pointer"
            onClick={handleBecomePublisher}
          >
            <SquarePen />
            <p>become publisher</p>
          </Button>
        ))}
    </div>
  );
}
