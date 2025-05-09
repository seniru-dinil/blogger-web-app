"use client";

import { useAuth } from "@/context/authContext";
import { redirect, useParams } from "next/navigation";

export default function EditArticle() {
  const { role } = useAuth();
  const { articleId } = useParams();
  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }
  return <h1>this is edit article page {articleId}</h1>;
}
