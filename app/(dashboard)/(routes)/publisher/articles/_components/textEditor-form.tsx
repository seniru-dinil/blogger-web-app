"use client";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/ui/RichTextEditor";
import ArticleData from "@/model/articleData.model";
import { useState } from "react";

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
    <>
      <RichTextEditor
        onUpdate={(html) => setContent(html)}
        content={articleData.content}
      />
      <Button onClick={() => handleDescriptionOnUpdate(content)}>update</Button>
    </>
  );
}
