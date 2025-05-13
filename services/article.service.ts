import api from "@/api/api";
import { URL } from "@/api/api.config";
import Article, { Category } from "@/model/article.model";
import Comment from "@/model/comment.model";
import Image from "@/model/Image.model";

export const createArticle = (data: Article) =>
  api.post(URL.ARTICLE.CREATE_ARTICLE, data);

export const deleteArticle = (id: number) =>
  api.delete(`${URL.ARTICLE.DELETE_ARTICLE}/${id}`);

export const updateArticleTitle = (id: number, title: string) =>
  api.patch(`${URL.ARTICLE.UPDATE_ARTICLE}/${id}`, {
    title,
  });
export const updateArticleDescription = (id: number, description: string) =>
  api.patch(`${URL.ARTICLE.UPDATE_ARTICLE}/${id}`, {
    description,
  });

export const updateArticleImage = (id: number, image: Image) =>
  api.patch(`${URL.ARTICLE.UPDATE_ARTICLE}/${id}`, {
    image,
  });
export const updateArticleCategory = (id: number, category: Category) =>
  api.patch(`${URL.ARTICLE.UPDATE_ARTICLE}/${id}`, {
    category,
  });

export const getArticle = (id: number, signal: AbortSignal) =>
  api.get(`${URL.ARTICLE.GET_ARTICLE}/${id}`);

export const getArticleList = () => api.get(URL.ARTICLE.GET_ARTICLES);

export const publishArticle = (id: number) =>
  api.post(`${URL.ARTICLE.PUBLISH_ARTICLE}/${id}/publish`);

export const unpublishArticle = (id: number) =>
  api.post(`${URL.ARTICLE.UNPUBLISH_ARTICLE}/${id}/unpublish`);

export const likeArticle = (id: number) =>
  api.post(`${URL.ARTICLE.LIKE_ARTICLE}/${id}/like`);

export const reportArticle = (id: number) =>
  api.post(`${URL.ARTICLE.REPORT_ARTICLE}/${id}/report`);

export const commentArticle = (id: number, comment: Comment) =>
  api.post(`${URL.ARTICLE.COMMENT_ARTICLE}/${id}/comment`, comment);

export const getCategoryList = () => api.get(URL.CATEGORY.GET_CATEGORIES);
