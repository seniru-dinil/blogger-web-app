"use client";

import { Role } from "@/context/authContext";
import Article, { CategoryType } from "@/model/article.model";
import {
  getArticle,
  updateArticleCategory,
  updateArticleDescription,
  updateArticleImage,
  updateArticleTitle,
} from "@/services/article.service";
import { Columns3Cog, ListCollapse, SquarePen } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TitleForm from "../_components/title-form";
import { z } from "zod";
import { descriptionSchema, titleSchema } from "@/schema/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DescriptionForm from "../_components/description-form";
import ImageForm from "../_components/image-form";
import ComboboxForm from "../_components/combobox-form";
import TextEditor from "@/components/ui/TextEditor/editor";
import TextEditorForm from "../_components/textEditor-form";
import ArticleDataListForm from "../_components/articleData-form";
import ArticleDataForm from "../_components/articleData-form";

export default function EditArticle() {
  const [loading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
  const { articleId } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isDescriptionEditing, setIsDescriptionEditing] =
    useState<boolean>(false);

  useEffect(() => {
    if (!role.includes("ROLE_PUBLISHER")) {
      return redirect("/Unauthorized");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchArticle() {
      setIsLoading(true);
      try {
        const { data } = await getArticle(Number(articleId), controller.signal);
        setIsLoading(false);
        if (data.authorId != localStorage.getItem("id")) {
          router.replace("/Unauthorized");
        } else {
          setArticle(data);
        }
      } catch (erro: any) {
        if (erro?.code == "ERR_NETWORK") {
          toast.error(erro?.message);
        } else if (erro?.response?.status == 500) {
          toast.error("Internal server error");
        } else if (erro?.response?.status == 406) {
          toast.error(erro?.response?.data?.message);
          return router.replace("/login ");
        } else {
          toast.error(erro?.response?.data?.message);
        }
        return router.push("/publisher/articles");
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticle();
    return () => {
      controller.abort();
    };
  }, [articleId]);

  if (loading) {
    return (
      <div className=" h-full w-full p-4">
        <div className="space-y-1.5">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-5 w-[150px]" />
        </div>
        <Skeleton className="h-9 max-w-[400px] mt-20" />
        <div className="mt-20 grid md:grid-cols-2 grid-cols-1 gap-5">
          <Skeleton className="h-[130px]" />
          <Skeleton className="h-[130px]" />
          <Skeleton className="h-[130px]" />
          <Skeleton className="h-[130px]" />
        </div>
      </div>
    );
  }

  if (!article) {
    return;
  }

  const requiredFields = [
    article.title,
    article.description,
    article.articleDataList,
    article.category,
    article.image,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  async function handleTitleFormSubmit(values: z.infer<typeof titleSchema>) {
    try {
      const { data } = await updateArticleTitle(
        article?.id || -5,
        values.title
      );
      if (article)
        setArticle({
          ...article,
          title: data.title,
        });
      toast.success("Title updated");
    } catch (erro: any) {
      if (erro?.code == "ERR_NETWORK") {
        toast.error(erro?.message);
      } else if (erro?.response?.status == 500) {
        toast.error("internal server error");
      } else {
        toast.error(erro?.response?.data?.message);
      }
    } finally {
      setIsTitleEditing(false);
    }
  }

  async function handleDescriptionFormSubmit(
    values: z.infer<typeof descriptionSchema>
  ) {
    try {
      const { data } = await updateArticleDescription(
        article?.id || -5,
        values.description
      );
      if (article)
        setArticle({
          ...article,
          description: data.description,
        });
      toast.success("Description updated");
    } catch (erro: any) {
      if (erro?.code == "ERR_NETWORK") {
        toast.error(erro?.message);
      } else if (erro?.response?.status == 500) {
        toast.error("Internal server error");
      } else {
        toast.error(erro?.response?.data?.message);
      }
    } finally {
      setIsDescriptionEditing(false);
    }
  }

  async function handleImageFormSubmit(url?: string) {
    try {
      const { data } = await updateArticleImage(article?.id || -5, {
        imageUrl: url || "",
      });
      setArticle({
        ...data,
      });
      toast.success("Image updated");
    } catch (error) {
      toast.error("Image update failed");
    }
  }

  async function handleComboboxFormSubmit(value: CategoryType) {
    try {
      const { data } = await updateArticleCategory(article?.id || -5, {
        name: value,
      });
      setArticle({
        ...data,
      });
      toast.success("Category updated");
    } catch (error) {
      toast.error("Category update failed");
    }
  }

  return (
    <>
      <div className="p-5  flex flex-col  justify-center">
        <div className="grid">
          <h1 className="text-2xl font-medium">Article Setup</h1>
          <p className="text-slate-700 text-sm">
            Complete all fields {completionText}
          </p>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-9 md:gap-5  w-full mt-13">
          <div>
            <div className="flex items-center gap-2 h-fit mb-5">
              <div className="bg-sky-200/20 p-[0.5em] rounded-full">
                <Columns3Cog
                  className="text-sky-600 "
                  size={30}
                  strokeWidth={2}
                />
              </div>
              <h2 className="text-2xl font-medium">Customize your Article</h2>
            </div>
            <div className="space-y-5">
              <div className="bg-slate-100 p-4 rounded-sm grid gap-3 ">
                <div className="flex justify-between items-center">
                  <p className="p-0 m-0 font-medium">Article title</p>
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
                    initialData={article.title}
                  />
                ) : (
                  <p className="text-md text-gray-700">{article.title}</p>
                )}
              </div>
              <div className="bg-slate-100 p-4 rounded-sm grid gap-3 ">
                <div className="flex justify-between items-center ">
                  <p className="p-0 m-0 font-medium ">Article description</p>
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
                  <DescriptionForm
                    onSubmit={handleDescriptionFormSubmit}
                    initialData={article.description}
                  />
                ) : (
                  <p className="text-md text-gray-700">{article.description}</p>
                )}
              </div>
              {article.image?.imageUrl ? (
                <ImageForm
                  onSubmit={handleImageFormSubmit}
                  initialData={article.image?.imageUrl}
                />
              ) : (
                <ImageForm onSubmit={handleImageFormSubmit} />
              )}
              {article.category != null ? (
                <ComboboxForm
                  onChange={handleComboboxFormSubmit}
                  value={article.category.name}
                />
              ) : (
                <ComboboxForm onChange={handleComboboxFormSubmit} />
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 h-fit mb-5">
              <div className="bg-sky-200/20 p-[0.5em] rounded-full">
                <ListCollapse
                  className="text-sky-600 "
                  size={30}
                  strokeWidth={2}
                />
              </div>
              <h2 className="text-2xl font-medium">Article Data</h2>
            </div>
            <ArticleDataForm
              articleDataList={article.articleDataList}
              setArticle={setArticle}
            />
          </div>
        </div>
      </div>
    </>
  );
}
