import { InformationUser } from "./user.model";
export interface ArticleParameter {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}
export interface Comment {
  id: number;
  author: InformationUser;
  body: string;
  createdAt: string;
  updatedAt: string;
}
export interface CommentUpload {
  slug: string;
  body: string;
}
export interface IArticle {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  body: string;
  author: InformationUser;
  favorited: boolean;
  favoritesCount: number;
  comments?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}
export interface ArticleCreate {
  title: string;
  description: string;
  tagList: string[];
  body?: string;
}
export interface ArticleModal {
  title: string;
  description: string;
  tagList: string[];
}
