"use client";

import { Button } from "@/components/ui/button";
import type ArticleData from "@/model/articleData.model";
import {
  deleteArticleData,
  getArticleData,
  updateArticleData,
} from "@/services/articleData.service";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ArticleData() {
  const router = useRouter();
  const { articleDataId } = useParams();
  const [articleData, setArticleData] = useState<null | ArticleData>(null);

  useEffect(() => {
    async function fetchArticleData() {
      try {
        const { data } = await getArticleData(Number(articleDataId) || -1);
        console.log(data);
        setArticleData(data);
      } catch (error: any) {
        toast.error("Error fetching article data");
      }
    }

    fetchArticleData();
  }, []);

  if (!articleData) {
    return;
  }

  const requiredFields = [articleData.title, articleData.content];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  async function handlePublishArticleData() {
    try {
      const { data } = await updateArticleData(Number(articleDataId) || -1, {
        ...articleData,
        isActive: true,
      });
      setArticleData(data);
      toast.success("Article data has been published.");
    } catch (error) {
      toast.error("Article data pubilsh failed");
    }
  }

  async function handleUnpublishArticleData() {
    try {
      const { data } = await updateArticleData(Number(articleDataId) || -1, {
        ...articleData,
        isActive: false,
      });
      setArticleData(data);
      toast.success("Article data has been unpublished.");
    } catch (error) {
      toast.error("Article data unpublish failed");
    }
  }

  async function handleDeleteArticleData() {
    try {
      const { data } = await deleteArticleData(Number(articleDataId) || -1);
      setArticleData(null);
      toast.success(`${data.message}`);
      router.back();
    } catch (error) {
      toast.error("Article data delete failed");
    }
  }

  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="grid">
            <h1 className="text-2xl font-medium">Article data setup</h1>
            <p className="text-slate-700 text-sm">
              Complete all fields {completionText}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size={"sm"}
              variant={"outline"}
              disabled={totalFields != completedFields}
              onClick={
                articleData.isActive
                  ? handleUnpublishArticleData
                  : handlePublishArticleData
              }
            >
              {articleData.isActive ? <p>Unpublish</p> : <p>Publish</p>}
            </Button>
            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={handleDeleteArticleData}
            >
              <Trash />
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
