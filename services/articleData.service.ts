import api from "@/api/api";
import { URL } from "@/api/api.config";
import ArticleData from "@/model/articleData.model";

export const createArticleData = (articleData: ArticleData) =>
  api.post(URL.ARTICLE_DATA.CREATE_ARTICLE_DATA, articleData);
