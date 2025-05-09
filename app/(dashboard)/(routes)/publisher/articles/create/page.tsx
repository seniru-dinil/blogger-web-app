"use client";

import { redirect, useRouter } from "next/navigation";
import TitleForm from "../_components/title-form";
import DescriptionForm from "../_components/description-form";
import { z } from "zod";
import { descriptionSchema, imageSchema, titleSchema } from "@/schema/schema";
import { useEffect, useState } from "react";
import ImageForm from "../_components/image-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";

export default function CreateArticle() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isArticleImageLoading, setIsArticleImageLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);

  useEffect(() => {
    setIsArticleImageLoading(false);
  }, [imgUrl]);

  const handleTitleFormSubmit = (values: z.infer<typeof titleSchema>) => {
    setTitle(values.title);
    setStep((prev) => prev + 1);
  };

  const handleDescriptionFormSubmit = (
    values: z.infer<typeof descriptionSchema>
  ) => {
    setDescription(values.description);
    setStep((prev) => prev + 1);
  };

  const handleImageFormSubmit = (url?: string, key?: string) => {
    setIsArticleImageLoading(true);
    setImgUrl(url || null);
    setFileKey(key || null);
  };

  async function handleDiscard() {
    if (!fileKey) return;

    try {
      await fetch("/api/delete-uploadthing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey }),
      });
      setImgUrl(null);
      setFileKey(null);
      setStep(2);
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  }

  function handleCreateArticle() {
    toast.success("article created successfull!");
    router.replace("/publisher/articles/4");
  }

  const steps = ["Title", "Description", "Image", "Preview"];
  const progress = ((step + 1) / steps.length) * 100;

  const { role } = useAuth();
  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }

  return (
    <div className="h-full">
      <div className="max-w-5xl  flex mx-auto md:items-center justify-center h-full p-6 ">
        {step === 0 && (
          <div>
            <div className="mb-7">
              <h1 className="text-2xl font-semibold ">Name your article</h1>
              <p className="text-sm text-slate-500">
                What would you name your article? Don't worry you can change it
                later.
              </p>
            </div>
            <TitleForm onSubmit={handleTitleFormSubmit} />
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="mb-7">
              <h1 className="text-2xl font-semibold ">Short Description</h1>
              <p className="text-sm text-slate-500">
                Give a short description about what this article is about
              </p>
            </div>
            <DescriptionForm onSubmit={handleDescriptionFormSubmit} />
          </div>
        )}
        {step === 2 &&
          (imgUrl != null ? (
            isArticleImageLoading ? (
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            ) : (
              <div className="space-y-5">
                <h1 className="text-2xl font-semibold ">Article Image</h1>
                <ImageForm
                  initialData={imgUrl}
                  handleDiscard={() => {
                    handleDiscard();
                  }}
                  handleDone={() => {
                    setStep((prev) => prev + 1);
                  }}
                  onSubmit={(url, key) => {
                    handleImageFormSubmit(url, key);
                  }}
                />
              </div>
            )
          ) : (
            <div>
              <div className="mb-7">
                <h1 className="text-2xl font-semibold ">Article Image</h1>
                <p className="text-sm text-slate-500">
                  Add an image for the article
                </p>
              </div>
              <ImageForm
                onSubmit={(url, key) => {
                  handleImageFormSubmit(url, key);
                }}
              />
            </div>
          ))}

        {step === 3 && (
          <div className="flex flex-col gap-7 justify-center h-fit md:h-full  ">
            <h1 className="text-2xl font-semibold text-slate-600">
              Preview of your base setup for article
            </h1>
            <div className="flex gap-10  md:flex-row flex-col justify-center bg-slate-100 p-6 rounded-md ">
              <div className="space-y-4">
                <h2 className="md:text-4xl text-3xl font-extrabold text-slate-800  ">
                  {title}
                </h2>
                <p className="text-[1.2rem] text-slate-500  font-semibold">
                  {description}
                </p>
              </div>
              <div className="w-full  flex justify-center ">
                {imgUrl && (
                  <Image
                    alt="Article Image"
                    src={imgUrl}
                    width={250}
                    height={200}
                    className="rounded-md object-cover "
                  />
                )}
              </div>
            </div>
            <Button onClick={handleCreateArticle} className="w-fit block">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
