import ArticleData from "./articleData.model";
import Comment from "./comment.model";
import Image from "./Image.model";

export default interface Article {
  id?: number;
  title: string;
  description: string;
  authorId: number;
  authorName: string;
  category?:
    | "TECH"
    | "JAVA"
    | "PROGRAMMING"
    | "LIFESTYLE"
    | "TRAVEL"
    | "TUTORIALS"
    | "SPRING BOOT ";
  articleDataList?: ArticleData[];
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
  commentCount?: number;
  commentList?: Comment[];
  isActive?: boolean;
  isReported?: boolean;
  isPremium?: boolean;
  image?: Image;
}
