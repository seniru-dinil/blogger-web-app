"use client";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/ui/TextEditor/editor";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

export default function TextEditorForm() {
  const [articleData, setArticleData] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleOnUpdate(value: string) {
    setArticleData(value);
  }

  return <div className="bg-sky-200/40  p-2 rounded-sm"></div>;
}
