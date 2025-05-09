"use client";

import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

export default function PublisherArticles() {
  const { role } = useAuth();
  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }
  return <h3>this is publisher articles</h3>;
}
