"use client";

import { Role } from "@/context/authContext";
import { redirect, useRouter } from "next/navigation";
import { DataTable } from "./_components/table/data-table";
import { getColumns } from "./_components/table/columns";
import { useEffect, useState } from "react";

import { deleteArticle, getArticleList } from "@/services/article.service";
import toast from "react-hot-toast";
import Article from "@/model/article.model";

// const sampleArticles: Article[] = [
//   {
//     id: 1,
//     title: "Understanding Java Streams",
//     description: "A comprehensive guide to Java Streams.",
//     authorId: 1,
//     authorName: "John Doe",
//     isReported: false,
//     isActive: true,
//     category: undefined,
//     createdAt: "2025-04-01T10:00:00Z",
//   },
//   {
//     id: 2,
//     title: "Exploring the Swiss Alps",
//     description: "Travel experiences in the Swiss Alps.",
//     authorId: 2,
//     authorName: "Jane Smith",
//     isReported: true,
//     isActive: false,
//     category: {
//       id: 102,
//       name: "TRAVEL",
//     },
//     createdAt: "2025-03-20T14:30:00Z",
//   },
//   {
//     id: 3,
//     title: "A Guide to Spring Boot Microservices",
//     description: "Learn how to build microservices with Spring Boot.",
//     authorId: 3,
//     authorName: "Alice Johnson",
//     isReported: false,
//     isActive: true,
//     category: {
//       id: 103,
//       name: "SPRING BOOT ",
//     },
//     createdAt: "2025-02-15T08:45:00Z",
//   },
//   {
//     id: 4,
//     title: "Healthy Lifestyle Tips for Developers",
//     description: "Tips for maintaining a healthy lifestyle as a developer.",
//     authorId: 4,
//     authorName: "Bob Lee",
//     isReported: true,
//     isActive: true,
//     category: {
//       id: 104,
//       name: "LIFESTYLE",
//     },
//     createdAt: "2025-01-10T09:15:00Z",
//   },
//   {
//     id: 5,
//     title: "Introduction to TypeScript",
//     description: "An introduction to TypeScript for JavaScript developers.",
//     authorId: 5,
//     authorName: "Carol White",
//     isReported: false,
//     isActive: false,
//     category: {
//       id: 105,
//       name: "PROGRAMMING",
//     },
//     createdAt: "2025-05-01T12:00:00Z",
//   },
// ];

export default function PublisherArticles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const safeArticleList = articles ?? [];

  async function handleDelete(articleId: number) {
    try {
      const { data } = await deleteArticle(articleId);
      setArticles((prev) =>
        prev ? prev.filter((article) => article.id != articleId) : prev
      );
      toast.success(data?.message);
    } catch (erro: any) {
      const message = erro?.response?.data?.message || "Article delete failed";
      toast.error(message);
    }
  }

  useEffect(() => {
    async function fetchPublisherArticles() {
      try {
        const { data } = await getArticleList();
        setArticles(data);
      } catch (erro: any) {
        if (erro?.code === "ERR_NETWORK") {
          toast.error(erro?.message || "Network error");
        } else {
          const message =
            erro?.response?.data?.message || "Failed to fetch articles";
          toast.error(message);
        }
      }
    }
    fetchPublisherArticles();
  }, []);

  useEffect(() => {
    const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
    if (!role.includes("ROLE_PUBLISHER")) {
      return redirect("/Unauthorized");
    }
  }, []);

  const columns = getColumns(router, handleDelete);

  return (
    <div className="h-full  px-10 mt-10 flex justify-center ">
      <div className="container max-w-7xl">
        <DataTable columns={columns} data={safeArticleList} />
      </div>
    </div>
  );
}
