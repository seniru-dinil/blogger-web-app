"use client";

import { Role } from "@/context/authContext";
import Article from "@/model/article.model";
import { getArticle } from "@/services/article.service";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditArticle() {
  const router = useRouter();
  const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchArticle() {
      try {
        const { data } = await getArticle(Number(articleId), controller.signal);
        setArticle(data);
        if (data.authorId != localStorage.getItem("id")) {
          router.replace("/");
        }
      } catch (erro: any) {
        if (erro?.response?.status == 406) {
          toast.error(erro?.response?.data?.message);
          return router.push("/login");
        }
        toast.error(erro?.response?.data?.message);
      }
    }
    fetchArticle();
    return () => {
      controller.abort();
    };
  }, [articleId]);

  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }

  if (!article) {
    return <h1>article not found</h1>;
  }
  const requiredFields = [
    article.title,
    article.description,
    article.articleDataList,
    article.category,
    article.image,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length - 1;
  const completionFields = `${completedFields}/${totalFields}`;

  return (
    <>
      <p>completion tasks {completionFields}</p>
    </>
  );
}
