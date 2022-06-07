import { CommentUpload } from "models/article.model";
import httpRequest from "../api/configApi";
import { ArticleCreate } from "../models/article.model";
const articles = {
  create: (article: ArticleCreate) => {
    return httpRequest.post("/articles", { article });
  },
  updateArticle: (slug: string, article: ArticleCreate) => {
    return httpRequest.put(`/articles/${slug}`, { article });
  },
  deleteArticle: (slug: string) => {
    return httpRequest.delete(`/articles/${slug}`);
  },
  getListArticlesFilter: ({ author = "", limit = 20, offset = 0 }) => {
    return httpRequest.get(`/articles?author=${author}&limit=${limit}&offset=${offset}`);
  },
  getListArticlesFavorite: ({ author = "", limit = 20, offset = 0 }) => {
    return httpRequest.get(`/articles?favorited=${author}&limit=${limit}&offset=${offset}`);
  },
  getListArticles: () => {
    return httpRequest.get(`/articles`);
  },
  getListArticlesFeed: () => {
    return httpRequest.get(`/articles/feed`);
  },
  getArticle: (slug: string) => {
    return httpRequest.get(`/articles/${slug}`);
  },
  favoriteArticle: (slug: string) => {
    return httpRequest.post(`/articles/${slug}/favorite`);
  },
  unFavoriteArticle: (slug: string) => {
    return httpRequest.delete(`/articles/${slug}/favorite`);
  },
  getCommentsInArticle: (slug: string) => {
    return httpRequest.get(`/articles/${slug}/comments`);
  },
  addCommentToArticle: ({ slug, body }: CommentUpload) => {
    return httpRequest.post(`/articles/${slug}/comments`, { comment: { body } });
  },
  deleteCommentInArticle: (slug: string, idComment: string) => {
    return httpRequest.delete(`/articles/${slug}/comments/${idComment}`);
  },
};
export default articles;
