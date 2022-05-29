import httpRequest from "../api/configApi";
import { ArticleDetail, ArticleParameter } from "../models/article.model";
const articles = {
  create: (article: ArticleDetail) => {
    return httpRequest.post("/articles", { article });
  },
  updateArticle: (slug: string, article: ArticleDetail) => {
    return httpRequest.put(`/articles${slug}`, article);
  },
  deleteArticle: (slug: string) => {
    return httpRequest.delete(`/articles${slug}`);
  },
  // { tag = "", author = "", favorited = "", limit = 20, offset = 0 }: ArticleParameter
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
    return httpRequest.post(`/articles/${slug}/comments/favorite`);
  },
  unFavoriteArticle: (slug: string) => {
    return httpRequest.delete(`/articles/${slug}/comments/favorite`);
  },
  getCommentsInArticle: (slug: string) => {
    return httpRequest.get(`/articles/${slug}/comments`);
  },
  addCommentToArticle: (slug: string, comment: string) => {
    return httpRequest.post(`/articles/${slug}/comments`, { comment: { body: comment } });
  },
  deleteCommentInArticle: (slug: string, idComment: string) => {
    return httpRequest.delete(`/articles/${slug}/comments/${idComment}`);
  },
};
export default articles;
