import ArticleData from "./articleData.model";

export default interface Article {
  id?: number;
  title: string;
  shortDescription: string;
  category: "TECH" | "ASTRONOMY" | "HEALTH" | "AUTO_MOBILE" | "TRAVEL";
  authorId: number;
  authorName: string;
  articleDataList: ArticleData[];
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
  commentList?: Comment[];
  commentCount?: number;
  isActive: boolean;
  isReported?: boolean;
}
