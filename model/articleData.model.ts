import Image from "./Image.model";

export default interface ArticleData {
  id?: number;
  title?: string;
  article?: number;
  content?: string;
  image?: Image;
  isActive?: boolean;
}
