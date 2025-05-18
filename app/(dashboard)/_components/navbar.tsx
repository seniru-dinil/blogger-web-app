"use client";

import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Role } from "@/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { becomePublisher } from "@/services/user.service";
import toast from "react-hot-toast";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  const pathName = usePathname();
  const router = useRouter();
  const id = Number(localStorage.getItem("id"));
  const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
  const [isPublisher, setIsPublisher] = useState(
    role.includes("ROLE_PUBLISHER")
  );

  async function handleBecomePublisher() {
    try {
      const { data } = await becomePublisher(id);
      if (data.roles.includes("ROLE_PUBLISHER")) {
        localStorage.setItem("role", JSON.stringify(data.roles));
        setIsPublisher(true);
        toast.success("you can now publish");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  function handleWrite() {
    router.push("/publisher/articles/create");
  }

  return (
    <div className=" h-16 border-b-[1] flex items-center px-6 justify-between ">
      <SidebarTrigger></SidebarTrigger>
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
