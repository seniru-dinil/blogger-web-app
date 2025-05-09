"use client";

import { useParams } from "next/navigation";

export default function EditArticle() {
  const { articleId } = useParams();
  return <h1>this is edit article page {articleId}</h1>;
}
