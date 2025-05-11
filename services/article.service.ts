import api from "@/api/api";
import { URL } from "@/api/api.config";
import Article from "@/model/article.model";
import Comment from "@/model/comment.model";

export const createArticle = (data: Article) =>
  api.post(URL.ARTICLE.CREATE_ARTICLE, data);

export const deleteArticle = (id: number) =>
  api.delete(`${URL.ARTICLE.DELETE_ARTICLE}/${id}`);

export const updateArticle = (id: number, data: Article) =>
  api.patch(`${URL.ARTICLE.UPDATE_ARTICLE}/${id}`, data);

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
