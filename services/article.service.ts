import api from "@/api/api";
import { URL } from "@/api/api.config";

export const createArticle = (data: any) =>
  api.post(URL.ARTICLE.CREATE_ARTICLE, data);
