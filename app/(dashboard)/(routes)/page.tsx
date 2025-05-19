"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ArticleBanner from "./_components/article-banner";
import { Separator } from "@/components/ui/separator";
import { getArticleList } from "@/services/article.service";
import Article from "@/model/article.model";
import toast from "react-hot-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { open, isMobile } = useSidebar();
  const [articles, setArticles] = useState<null | Article[]>(null);
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

  if (!articles) {
    return (
      <div className="mt-10 p-4 space-y-30">
        <div className="space-y-7">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-5 w-50 rounded-md" />
          </div>
          <div className="flex gap-6">
            <div className="space-y-7">
              <Skeleton className="w-150 h-20" />
              <Skeleton className="w-120 h-30" />
            </div>
            <Skeleton className="rounded-md h-44 w-60" />
          </div>
          <div className="">
            <Skeleton className="w-72 h-5 rounded-md" />
          </div>
        </div>
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-5 w-50 rounded-md" />
          </div>
          <div className="flex gap-6">
            <div className="space-y-7">
              <Skeleton className="w-150 h-20" />
              <Skeleton className="w-120 h-30" />
            </div>
            <Skeleton className="rounded-md h-44 w-60" />
          </div>
          <div className="">
            <Skeleton className="w-72 h-5 rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4  h-full mt-10">
      <div className="flex md:flex-row flex-col justify-between h-full">
        <div
          className={cn(
            "flex-1 flex-col gap-3  ",
            open ? "w-full" : "max-w-5xl mx-auto"
          )}
        >
          {articles ? (
            articles.map((data) => (
              <ArticleBanner key={data.id} article={data} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <Separator
          orientation={isMobile ? "horizontal" : "vertical"}
          className="mx-4 h-full  hidden xl:block"
        />
        <div className=" min-w-72 hidden xl:block">ad</div>
      </div>
    </div>
  );
}
