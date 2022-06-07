import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Comment, CommentUpload, IArticle } from "models/article.model";
import { ArticleCreate } from "../../models/article.model";

export interface ArticleState {
  loadingFetchArticleGlobal: boolean;
  loadingFetchArticleYouFeed: boolean;
  loadingFetchArticleFavorite: boolean;
  loadingFetchComment: boolean;
  loadingAddComment: boolean;
  loadingDeleteComment: boolean;
  loadingCreateArticle: boolean;
  articles: IArticle[];
  comments: Comment[];
  slugLoading: string;
  tags: string[];
}
export interface Favotite {
  slug: string;
  type: "favorite" | "unfavorite";
  setSlugLoading: any;
  setLoadingFavorite: any;
}
export interface DeleteArticle {
  slug: string;
  setDeleteLoading: any;
}
const initialState: ArticleState = {
  loadingFetchArticleGlobal: false,
  loadingFetchArticleYouFeed: false,
  loadingFetchArticleFavorite: false,
  loadingFetchComment: false,
  loadingAddComment: false,
  loadingDeleteComment: false,
  loadingCreateArticle: false,
  articles: [],
  comments: [],
  slugLoading: "",
  tags: [],
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    fetchArticlesGlobal: (state) => {
      state.loadingFetchArticleGlobal = true;
    },
    fetchArticlesGlobalSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleGlobal = false;
      state.articles = action.payload;
    },
    fetchArticlesGlobalFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleGlobal = false;
    },
    fetchArticlesFavorite: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleFavorite = true;
    },
    fetchArticlesFavoriteSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleFavorite = false;
      state.articles = action.payload;
    },
    fetchArticlesFavoriteFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleFavorite = false;
    },
    fetchArticlesYouFeed: (state) => {
      state.loadingFetchArticleYouFeed = true;
    },
    fetchArticlesYouFeedSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleYouFeed = false;
      state.articles = action.payload;
    },
    fetchArticlesYouFeedFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleYouFeed = false;
    },
    fetchComments: (state, action: PayloadAction<string>) => {
      state.loadingFetchComment = true;
    },
    fetchCommentSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loadingFetchComment = false;
      state.comments = action.payload;
    },
    fetchCommentFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchComment = false;
    },
    fetchTags: () => {},
    fetchTagsSuccess: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    addCommentArticle: (state, action: PayloadAction<CommentUpload>) => {
      state.loadingAddComment = true;
    },
    addCommentToArticleSuccess: (state, action: PayloadAction<string>) => {
      state.loadingAddComment = false;
    },
    addCommentToArticlefailed: (state, action: PayloadAction<string>) => {
      state.loadingAddComment = false;
    },
    favoriteArticle: (state, action: PayloadAction<Favotite>) => {
      const articleExist = state.articles.find((item) => item.slug === action.payload.slug);
      if (articleExist) {
        switch (action.payload.type) {
          case "favorite":
            articleExist.favoritesCount = articleExist.favoritesCount + 1;
            break;
          case "unfavorite":
            articleExist.favoritesCount = articleExist.favoritesCount - 1;
            break;
        }
      }
    },
    setSlugLoading: (state, action: PayloadAction<string>) => {
      state.slugLoading = action.payload;
    },
    favoriteArticleSuccess: (state, action: PayloadAction<Favotite>) => {
      const articleExist = state.articles.find((item) => item.slug === action.payload.slug);
      if (articleExist) {
        switch (action.payload.type) {
          case "favorite":
            articleExist.favorited = true;
            break;
          case "unfavorite":
            articleExist.favorited = false;
            break;
        }
      }
    },
    favoriteArticleFaild: (state, action: PayloadAction<Favotite>) => {
      const articleExist = state.articles.find((item) => item.slug === action.payload.slug);
      if (articleExist) {
        switch (action.payload.type) {
          case "favorite":
            articleExist.favoritesCount = articleExist.favoritesCount - 1;
            break;
          case "unfavorite":
            articleExist.favoritesCount = articleExist.favoritesCount + 1;
            break;
        }
      }
    },
    createArticle: (state, action: PayloadAction<ArticleCreate>) => {
      state.loadingCreateArticle = true;
    },
    createArticleSuccess: (state) => {
      state.loadingCreateArticle = false;
    },
    createArticleFailed: (state) => {
      state.loadingCreateArticle = false;
    },
    editArticle: (state, action: PayloadAction<IArticle>) => {
      state.loadingCreateArticle = true;
    },
    editArticleSuccess: (state) => {
      state.loadingCreateArticle = false;
    },
    editArticleFailed: (state) => {
      state.loadingCreateArticle = false;
    },
    deleteComment: (state, action: PayloadAction<{ slug: string; idComment: number }>) => {
      state.loadingDeleteComment = true;
    },
    deleteCommentSuccess: (state) => {
      state.loadingDeleteComment = false;
    },
    deleteCommentFailed: (state) => {
      state.loadingDeleteComment = false;
    },
    deleteArticle: (state, action: PayloadAction<DeleteArticle>) => {},
  },
});

export const {
  addCommentArticle,
  addCommentToArticleSuccess,
  addCommentToArticlefailed,
  fetchArticlesGlobal,
  fetchArticlesGlobalFailed,
  fetchArticlesGlobalSuccess,
  fetchArticlesFavorite,
  fetchArticlesFavoriteFailed,
  fetchArticlesFavoriteSuccess,
  fetchArticlesYouFeed,
  fetchArticlesYouFeedFailed,
  fetchArticlesYouFeedSuccess,
  fetchComments,
  fetchCommentFailed,
  fetchCommentSuccess,
  fetchTags,
  fetchTagsSuccess,
  createArticle,
  createArticleSuccess,
  createArticleFailed,
  editArticle,
  favoriteArticle,
  favoriteArticleSuccess,
  favoriteArticleFaild,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailed,
  deleteArticle,
  setSlugLoading,
} = articleSlice.actions;
export const selectArticles = (state: RootState) => state.article.articles;
export const selectComments = (state: RootState) => state.article.comments;
export const selectTags = (state: RootState) => state.article.tags;
export const selectFetchArticleGlobalLoading = (state: RootState) => state.article.loadingFetchArticleGlobal;
export const selectFetchArticleYouFeedLoading = (state: RootState) => state.article.loadingFetchArticleYouFeed;
export const selectFetchArticleFavoriteLoading = (state: RootState) => state.article.loadingFetchArticleFavorite;
export const selectFetchCommentLoading = (state: RootState) => state.article.loadingFetchComment;
export const selectAddCommentLoading = (state: RootState) => state.article.loadingAddComment;
export const selectCreateLoading = (state: RootState) => state.article.loadingCreateArticle;
export const selectSlugLoading = (state: RootState) => state.article.slugLoading;
export default articleSlice.reducer;
