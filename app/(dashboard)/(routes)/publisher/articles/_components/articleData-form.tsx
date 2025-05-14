"use client";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import TitleForm from "./title-form";
import ArticleData from "@/model/articleData.model";
import ArticleDataList from "./articleData-list";
import { createArticleData as createData } from "@/services/articleData.service";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Article from "@/model/article.model";

interface ArticleDataFormProps {
  articleDataList?: ArticleData[];
  setArticle: Dispatch<SetStateAction<Article | null>>;
}

export default function ArticleDataForm({
  articleDataList,
  setArticle,
}: ArticleDataFormProps) {
  const { articleId } = useParams();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const safeArticleDataList = articleDataList ?? [];

  async function createArticleData({ title }: { title: string }) {
    try {
      const { data } = await createData({
        article: Number(articleId) || -4,
        title,
      });
      toast.success("Article data created");
      setArticle((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          articleDataList: [...(prev.articleDataList ?? []), data],
        };
      });
    } catch (error: any) {
      const errorData = error?.response?.data;
      const message =
        typeof errorData === "string"
          ? errorData
          : typeof errorData === "object"
          ? Object.values(errorData).join(", ")
          : "Something went wrong";

      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="bg-slate-100 p-4 rounded-sm">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center ">
          <p className="p-0 m-0 font-medium ">Article data list</p>
          {isCreating ? (
            <Button
              variant={"ghost"}
              onClick={() => setIsCreating((prev) => !prev)}
            >
              cansel
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              onClick={() => setIsCreating((prev) => !prev)}
            >
              <div className="flex gap-2 items-center">
                <CirclePlus />
                <p className="font-medium text-md">Add article data</p>
              </div>
            </Button>
          )}
        </div>

        {isCreating ? (
          <div>
            <TitleForm onSubmit={createArticleData} />
          </div>
        ) : safeArticleDataList.length > 0 ? (
          <ArticleDataList articleDataList={safeArticleDataList} />
        ) : (
          <p className="text-sm text-gray-700">Article data list is empty</p>
        )}
      </div>
    </div>
  );
}
