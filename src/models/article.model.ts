import { InformationUser } from "./user.model";
export interface ArticleParameter {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}
export interface ArticleDetail {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author: InformationUser;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  createdAt: string;
}
