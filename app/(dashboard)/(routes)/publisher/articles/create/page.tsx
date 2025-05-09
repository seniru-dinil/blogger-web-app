"use client";

import { useRouter } from "next/navigation";
import TitleForm from "../_components/title-form";
import DescriptionForm from "../_components/description-form";
import { z } from "zod";
import { descriptionSchema, imageSchema, titleSchema } from "@/schema/schema";
import { useEffect, useState } from "react";
import ImageForm from "../_components/image-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateArticle() {
  const [step, setStep] = useState(0);
  const [isArticleImageLoading, setIsArticleImageLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState<string | null>(null);

  useEffect(() => {
    setIsArticleImageLoading(false);
  }, [imgUrl]);

  const handleTitleFormSubmit = (values: z.infer<typeof titleSchema>) => {
    console.log(values.title);
    setStep((prev) => prev + 1);
  };

  const handleDescriptionFormSubmit = (
    values: z.infer<typeof descriptionSchema>
  ) => {
    console.log(values.description);
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

  return (
    <div className="h-full ">
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
            <DescriptionForm
              onSubmit={handleDescriptionFormSubmit}
              initialData="hello world"
            />
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
      </div>
    </div>
  );
}
