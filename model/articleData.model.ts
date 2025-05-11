import Image from "./Image.model";

export default interface ArticleData {
  id?: number;
  article?: number;
  content?: string;
  image?: Image;
}
