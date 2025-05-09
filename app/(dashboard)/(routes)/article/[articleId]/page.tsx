"use client";

import { useParams } from "next/navigation";

export default function Article() {
  const { articleId } = useParams();
  return <h1>this is edit article page article id: {articleId}</h1>;
}
