"use client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/lib/file-upload";
import Image from "next/image";

interface ImageFormProps {
  initialData?: string;
  onSubmit: (url?: string, key?: string) => void;
  handleDiscard?: () => void;
  handleDone?: () => void;
}

export default function ImageForm({
  initialData,
  onSubmit,
  handleDiscard,
  handleDone,
}: ImageFormProps) {
  if (initialData) {
    return (
      <div className="space-y-7">
        <div className="bg-slate-100 w-[300px] h-60 p-2 rounded-2xl">
          <Image
            alt="article image"
            src={initialData}
            width={300}
            height={100}
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div className="flex gap-5">
          <Button type="button" variant={"ghost"} onClick={handleDiscard}>
            discard
          </Button>
          <Button onClick={handleDone}>Done</Button>
        </div>
      </div>
    );
  }
  return (
    <FileUpload
      onChange={(url, key) => {
        if (url) {
          onSubmit(url, key);
        }
      }}
    />
  );
}
