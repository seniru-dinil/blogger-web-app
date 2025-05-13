"use client";

import { Role } from "@/context/authContext";
import { redirect } from "next/navigation";

export default function PublisherArticles() {
  const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }
  return <h3>this is publisher articles</h3>;
}
