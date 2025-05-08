import ArticleData from "./articleData.model";

export default interface Article {
  id: number;
  title: string;
  shortDescription: string;
  category: "TECH" | "ASTRONOMY" | "HEALTH";
  authorId: number;
  authorName: string;
  articleDataList: ArticleData[];
  isActive: boolean;
}
