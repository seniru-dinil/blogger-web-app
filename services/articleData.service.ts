import api from "@/api/api";
import { URL } from "@/api/api.config";
import ArticleData from "@/model/articleData.model";

export const createArticleData = (articleData: ArticleData) =>
  api.post(URL.ARTICLE_DATA.CREATE_ARTICLE_DATA, articleData);

export const deleteArticleData = (id: number) =>
  api.delete(`${URL.ARTICLE_DATA.DELETE_ARTICLE_DATA}/${id}`);

export const getArticleData = (id: number) =>
  api.get(`${URL.ARTICLE_DATA.GET_ARTICLE_DATA}/${id}`);

export const updateArticleData = (id: number, articleData: ArticleData) =>
  api.patch(`${URL.ARTICLE_DATA.UPDATE_ARTICLE_DATA}/${id}`, articleData);
