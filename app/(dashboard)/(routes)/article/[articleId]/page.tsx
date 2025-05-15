"use client";

import type Article from "@/model/article.model";
import { getArticle } from "@/services/article.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Ellipsis, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Article() {
  const { articleId } = useParams();
  const [article, setArticle] = useState<null | Article>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchArticle() {
      try {
        const { data } = await getArticle(Number(articleId), controller.signal);
        setArticle(data);
      } catch (error) {
        toast.error("Error fetching article");
      }
    }
    fetchArticle();
    return () => {
      controller.abort();
    };
  }, []);

  if (!article) return;

  return (
    <div className="max-w-5xl sm:py-16 py-5  mx-auto px-6  overflow-y-auto ">
      <h4 className="text-5xl font-bold  text-slate-600 mb-10">
        {article.title}
      </h4>

      <div className="flex sm:items-center gap-4 mb-7 sm:flex-row flex-col">
        <div className="flex items-center gap-4 ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{article.authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <p>{article.authorName}</p>
        </div>
        <p>
          {new Date(article.createdAt || "").toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>

      <div className="flex items-center justify-between text-slate-600 px-5">
        <div className="flex items-center gap-4">
          <Heart size={20} />
          <MessageCircle size={20} />
        </div>
        <div className="flex items-center gap-4">
          <Bookmark size={20} />
          <Ellipsis size={20} />
        </div>
      </div>
      <Separator className="my-5" />
      <div className="w-full h-52  relative  sm:h-120 my-8 sm:my-13">
        <Image
          alt="article image"
          src={article.image?.imageUrl || ""}
          fill
          className="object-contain h-full w-full aspect-video"
        />
      </div>

      <div className="sm:space-y-4 space-y-4">
        <h4 className="text-[2rem] font-bold text-slate-600">Introduction</h4>
        <p className="text-gray-700 ">{article.description}</p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-10">
        {(article.articleDataList ?? []).length > 0 ? (
          article.articleDataList?.map((articleData, idx) => (
            <div className="space-y-3">
              <p className="text-2xl font-semibold text-slate-700">
                {articleData.title}
              </p>
              <div className="prose max-w-none" key={idx}>
                <div
                  className="prose max-w-none"
                  key={idx}
                  dangerouslySetInnerHTML={{
                    __html:
                      articleData.content?.replace(/style="[^"]*"/g, "") || "",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <h1>No content available</h1>
        )}
      </div>
    </div>
  );
}
