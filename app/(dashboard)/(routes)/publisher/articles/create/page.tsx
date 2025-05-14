"use client";

import { redirect, useRouter } from "next/navigation";
import TitleForm from "../_components/title-form";
import DescriptionForm from "../_components/description-form";
import { z } from "zod";
import { descriptionSchema, titleSchema } from "@/schema/schema";
import { useState } from "react";
import toast from "react-hot-toast";
import { createArticle } from "@/services/article.service";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export default function CreateArticle() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const email = localStorage.getItem("email") || "";
  const id = Number(localStorage.getItem("id")) || 0;
  const role = JSON.parse(localStorage.getItem("role") || "[]");

  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }

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

  async function handleCreateArticle() {
    try {
      setIsCreating(true);
      const { data } = await createArticle({
        authorId: id,
        authorName: email,
        description: description,
        title: title,
      });
      setDescription("");
      setTitle("");
      toast.success("article created successfull");
      router.replace(`/publisher/articles/${data.id}`);
    } catch (erro: any) {
      console.log(erro);
      if (erro?.code == "ERR_NETWORK") {
        toast.error(erro?.message);
      } else if (erro?.response?.status == 500) {
        toast.error("internal server error");
      } else {
        toast.error(erro?.response?.data?.message);
      }
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="h-full  relative">
      <div className="max-w-5xl  flex mx-auto md:items-center justify-center sm:flex-col h-full p-6 ">
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
        {step === 2 && (
          <div className="grid gap-2  max-w-3xl  h-fit">
            <h2 className="sm:text-4xl text-2xl font-bold ">{title}</h2>
            <h3 className="text-md text-slate-600">{description}</h3>
            <Button
              disabled={
                step !== 2 ||
                description.length == 0 ||
                title.length == 0 ||
                isCreating
              }
              onClick={handleCreateArticle}
              className="mt-10 sm:w-1/2 xl:w-2/5 w-full "
            >
              {isCreating ? (
                <div className="flex justify-center gap-3 items-center">
                  <Loader className="animate-spin" />
                  <p>creating</p>
                </div>
              ) : (
                <p>create article</p>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
