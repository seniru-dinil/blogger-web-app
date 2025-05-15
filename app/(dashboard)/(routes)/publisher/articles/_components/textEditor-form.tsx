"use client";
import { Button } from "@/components/ui/button";
import TextEditor from "@/components/ui/TextEditor/editor";
import ArticleData from "@/model/articleData.model";
import { updateArticleData } from "@/services/articleData.service";
import { useState } from "react";
import toast from "react-hot-toast";

interface TextEditorFormProps {
  articleData: ArticleData;
  handleDescriptionOnUpdate: (value: string) => void;
}

export default function TextEditorForm({
  handleDescriptionOnUpdate,
  articleData,
}: TextEditorFormProps) {
  const [content, setContent] = useState<string>("");

  return (
    <div className="space-y-5">
      <TextEditor
        onUpdate={(value) => setContent(value)}
        initialData={articleData.content}
      />
      <Button onClick={() => handleDescriptionOnUpdate(content)}>update</Button>
    </div>
  );
}
