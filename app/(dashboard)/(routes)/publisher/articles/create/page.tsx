"use client";

import { redirect, useRouter } from "next/navigation";
import TitleForm from "../_components/title-form";
import DescriptionForm from "../_components/description-form";
import { z } from "zod";
import { descriptionSchema, titleSchema } from "@/schema/schema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { createArticle } from "@/services/article.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateArticle() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{} | null>(null);
  const email = localStorage.getItem("email") || "";
  const id = Number(localStorage.getItem("id")) || 0;
  const role = JSON.parse(localStorage.getItem("role") || "[]");

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
    setErrors(null);
    try {
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
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      } else {
        setErrors({
          message: "something went wront ",
        });
      }
    }
  }

  if (!role.includes("ROLE_PUBLISHER")) {
    return redirect("/Unauthorized");
  }

  return (
    <div className="h-full  relative">
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
        {step === 2 && (
          <Button onClick={handleCreateArticle} className="w-fit block">
            Continue
          </Button>
        )}
      </div>
      {errors && (
        <Alert variant="destructive" className="bg-red-100 w-1/2  absolute ">
          <AlertTitle>Error</AlertTitle>
          {Object.entries(errors).map(([field, message]) => (
            <AlertDescription key={field}>{String(message)}</AlertDescription>
          ))}
        </Alert>
      )}
    </div>
  );
}
