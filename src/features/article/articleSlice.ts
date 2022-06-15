import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IArticle } from "models/article.model";
import { ArticleCreate } from "../../models/article.model";

export interface ArticleState {
  loadingFetchArticleGlobal: boolean;
  loadingFetchArticleYouFeed: boolean;
  loadingFetchArticleFavoriteByAuthor: boolean;
  loadingFetchArticleByAuthor: boolean;
  loadingCreateArticle: boolean;
  loadingDetailArticle: boolean;
  articleDetail: IArticle;
  articles: IArticle[];
  tags: string[];
  limit: number;
  totalArticleGlobal: number;
  totalArticleYouFeed: number;
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
  loadingFetchArticleByAuthor: false,
  loadingFetchArticleFavoriteByAuthor: false,
  loadingFetchArticleGlobal: false,
  loadingFetchArticleYouFeed: false,
  loadingCreateArticle: false,
  loadingDetailArticle: false,
  articleDetail: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
  articles: [],
  tags: [],
  limit: 3,
  totalArticleGlobal: 0,
  totalArticleYouFeed: 0,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    fetchArticlesGlobal: (state, action: PayloadAction<{ limit: number; offset: number }>) => {
      state.loadingFetchArticleGlobal = true;
    },
    fetchArticlesGlobalSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleGlobal = false;
      state.articles = action.payload;
    },
    fetchArticlesGlobalFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleGlobal = false;
    },

    setTotalArticleGlobal: (state, action: PayloadAction<number>) => {
      state.totalArticleGlobal = action.payload;
    },
    setTotalArticleYouFeed: (state, action: PayloadAction<number>) => {
      state.totalArticleYouFeed = action.payload;
    },

    fetchArticlesByAuthor: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleByAuthor = true;
    },
    fetchArticlesByAuthorSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleByAuthor = false;
      state.articles = action.payload;
    },

    fetchArticlesFavoriteByAuthor: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleFavoriteByAuthor = true;
    },
    fetchArticlesFavoriteByAuthorSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleFavoriteByAuthor = false;
      state.articles = action.payload;
    },
    fetchArticlesFavoriteByAuthorFailed: (state) => {
      state.loadingFetchArticleFavoriteByAuthor = false;
    },

    fetchDetailArticle: (state, action: PayloadAction<string>) => {
      state.loadingDetailArticle = true;
    },
    fetchDetailArticleSuccess: (state, action: PayloadAction<IArticle>) => {
      state.loadingDetailArticle = false;
      state.articleDetail = action.payload;
    },
    fetchDetailArticleFailed: (state, action: PayloadAction<string>) => {
      state.loadingDetailArticle = false;
    },

    fetchArticlesYouFeed: (state, action: PayloadAction<{ limit: number; offset: number }>) => {
      state.loadingFetchArticleYouFeed = true;
    },
    fetchArticlesYouFeedSuccess: (state, action: PayloadAction<IArticle[]>) => {
      state.loadingFetchArticleYouFeed = false;
      state.articles = action.payload;
    },
    fetchArticlesYouFeedFailed: (state, action: PayloadAction<string>) => {
      state.loadingFetchArticleYouFeed = false;
    },

    fetchTags: () => {},
    fetchTagsSuccess: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
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
    deleteArticle: (state, action: PayloadAction<DeleteArticle>) => {},
  },
});

export const {
  fetchArticlesGlobal,
  fetchArticlesGlobalFailed,
  fetchArticlesGlobalSuccess,
  fetchArticlesYouFeed,
  fetchArticlesYouFeedFailed,
  fetchArticlesYouFeedSuccess,
  fetchTags,
  fetchTagsSuccess,
  createArticle,
  createArticleSuccess,
  createArticleFailed,
  editArticle,
  editArticleSuccess,
  editArticleFailed,
  favoriteArticle,
  favoriteArticleSuccess,
  favoriteArticleFaild,
  deleteArticle,
  fetchArticlesByAuthor,
  fetchArticlesByAuthorSuccess,
  fetchArticlesFavoriteByAuthor,
  fetchArticlesFavoriteByAuthorSuccess,
  fetchArticlesFavoriteByAuthorFailed,
  fetchDetailArticle,
  fetchDetailArticleSuccess,
  fetchDetailArticleFailed,
  setTotalArticleGlobal,
  setTotalArticleYouFeed,
} = articleSlice.actions;
export const selectArticles = (state: RootState) => state.article.articles;
export const selectTotalArticleGlobal = (state: RootState) => state.article.totalArticleGlobal;
export const selectTotalArticleYouFeed = (state: RootState) => state.article.totalArticleYouFeed;
export const selectTags = (state: RootState) => state.article.tags;
export const selectLimit = (state: RootState) => state.article.limit;
export const selectFetchArticleGlobalLoading = (state: RootState) => state.article.loadingFetchArticleGlobal;
export const selectFetchArticleYouFeedLoading = (state: RootState) => state.article.loadingFetchArticleYouFeed;
export const selectCreateLoading = (state: RootState) => state.article.loadingCreateArticle;
export const selectLoadingFetchArticleByAuthor = (state: RootState) => state.article.loadingFetchArticleByAuthor;
export const selectLoadingFetchArticleFavoriteByAuthor = (state: RootState) =>
  state.article.loadingFetchArticleFavoriteByAuthor;
export const selectDetailArticle = (state: RootState) => state.article.articleDetail;
export const selectLoadingDetailArticle = (state: RootState) => state.article.loadingDetailArticle;
export default articleSlice.reducer;
