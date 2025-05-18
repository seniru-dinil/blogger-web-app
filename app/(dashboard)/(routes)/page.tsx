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
              <Link href={"/article/" + data.id}>
                <ArticleBanner key={data.id} article={data} />
              </Link>
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
