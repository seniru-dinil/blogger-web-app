import { Button } from "@/components/ui/button";
import FileUpload from "@/lib/file-upload";
import { CirclePlus, ImageIcon, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageFormProps {
  initialData?: string;
  onSubmit: (url?: string) => void;
}

export default function ImageForm({ initialData, onSubmit }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>();

  return (
    <div className="bg-slate-100 p-4 rounded-sm">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center ">
          <p className="p-0 m-0 font-medium ">Article image</p>
          <Button
            variant={"ghost"}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? (
              <p>cansel</p>
            ) : initialData != null ? (
              <div className="flex gap-2 items-center">
                <SquarePen strokeWidth={2} />{" "}
                <p className="font-medium text-md">Edit image</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <CirclePlus />
                <p className="font-medium text-md">Add image</p>
              </div>
            )}
          </Button>
        </div>
        {!isEditing ? (
          initialData == null ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-auto h-60 ">
              <Image
                alt="article image"
                src={initialData}
                fill
                className="object-fit rounded-md w-full"
              />
            </div>
          )
        ) : (
          <FileUpload
            onChange={(url, key) => {
              onSubmit(url);
              setIsEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
