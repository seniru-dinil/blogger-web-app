"use client";

import { Button } from "@/components/ui/button";
import type ArticleData from "@/model/articleData.model";
import {
  deleteArticleData,
  getArticleData,
  updateArticleData,
} from "@/services/articleData.service";
import { Columns3Cog, Image, SquarePen, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TitleForm from "../../_components/title-form";
import TextEditorForm from "../../_components/textEditor-form";
import ImageForm from "../../_components/image-form";

export default function ArticleData() {
  const router = useRouter();
  const { articleDataId } = useParams();
  const [articleData, setArticleData] = useState<null | ArticleData>(null);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isDescriptionEditing, setIsDescriptionEditing] =
    useState<boolean>(false);

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

  async function handleTitleFormSubmit({ title }: { title: string }) {
    try {
      const { data } = await updateArticleData(Number(articleDataId) || -1, {
        ...articleData,
        title,
      });
      setIsTitleEditing(false);
      setArticleData(data);
      toast.success("Title has been unpublished.");
    } catch (error) {
      toast.error("Title update failed");
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

  async function handleDescriptionOnUpdate(content: string) {
    try {
      const { data } = await updateArticleData(articleData?.id || -1, {
        ...articleData,
        content,
      });
      toast.success(
        data.content ? "Description updated" : "Description update failed"
      );
      setArticleData(data);
    } catch (error) {
      console.log(error);
      toast.error("Description update failed");
    } finally {
      setIsDescriptionEditing(false);
    }
  }

  async function handleImageFormSubmit(url?: string) {
    try {
      const { data } = await updateArticleData(articleData?.id || -5, {
        image: {
          imageUrl: url || "",
        },
      });
      setArticleData(data);
      toast.success("Image updated");
    } catch (error) {
      toast.error("Image update failed");
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
        <div className="grid xl:grid-cols-2 md:gap-5 gap-9 grid-cols-1 mt-13 w-full ">
          <div>
            <div className="flex items-center gap-2 h-fit mb-5">
              <div className="bg-sky-200/20 p-[0.5em] rounded-full">
                <Columns3Cog
                  className="text-sky-600 "
                  size={30}
                  strokeWidth={2}
                />
              </div>
              <h2 className="text-2xl font-medium">
                Customize your Article data
              </h2>
            </div>
            <div className="space-y-5">
              <div className="bg-slate-100 p-4 rounded-sm grid gap-3">
                <div className="flex justify-between items-center">
                  <p className="p-0 m-0 font-medium">Article data title</p>
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsTitleEditing((prev) => !prev)}
                  >
                    {isTitleEditing ? (
                      <p>cansel</p>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <SquarePen strokeWidth={2} />{" "}
                        <p className="font-medium text-md">Edit title</p>
                      </div>
                    )}
                  </Button>
                </div>
                {isTitleEditing ? (
                  <TitleForm
                    onSubmit={handleTitleFormSubmit}
                    initialData={articleData.title}
                  />
                ) : (
                  <p className="text-md text-gray-700">{articleData.title}</p>
                )}
              </div>

              <div className="bg-slate-100 p-4 rounded-sm space-y-5">
                <div className="flex items-center justify-between">
                  <p className="p-0 m-0 font-medium">
                    Article data description
                  </p>
                  <Button
                    variant={"ghost"}
                    onClick={() => setIsDescriptionEditing((prev) => !prev)}
                  >
                    {isDescriptionEditing ? (
                      <p>cansel</p>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <SquarePen strokeWidth={2} />{" "}
                        <p className="font-medium text-md">Edit description</p>
                      </div>
                    )}
                  </Button>
                </div>
                {isDescriptionEditing ? (
                  <TextEditorForm
                    articleData={articleData}
                    handleDescriptionOnUpdate={handleDescriptionOnUpdate}
                  />
                ) : articleData.content != null ? (
                  <div
                    className="text-md text-gray-700 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: articleData.content }}
                  />
                ) : (
                  <p className="text-md text-gray-700">description is empty</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 h-fit mb-5">
              <div className="bg-sky-200/20 p-[0.5em] rounded-full">
                <Image className="text-sky-600 " size={30} strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-medium">Article data image</h2>
            </div>
            <div>
              {articleData.image ? (
                <ImageForm
                  onSubmit={handleImageFormSubmit}
                  initialData={articleData.image.imageUrl}
                />
              ) : (
                <ImageForm onSubmit={handleImageFormSubmit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
