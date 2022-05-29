import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ArticleDetail } from "models/article.model";
export interface ArticleState {
  loading: boolean;
  listArticles: ArticleDetail[];
}
const initialState: ArticleState = {
  loading: false,
  listArticles: [],
};
export const ArticleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getListArticles: (state) => {
      state.loading = true;
    },
    getListArticlesSuccess: (state, action: PayloadAction<ArticleDetail[]>) => {
      state.loading = false;
      state.listArticles = action.payload;
    },
    getListArticlesFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
  },
});
export const { getListArticles, getListArticlesFailed, getListArticlesSuccess } = ArticleSlice.actions;
export const selectLoading = (state: RootState) => state.article.loading;
export const selectListArticles = (state: RootState) => state.article.listArticles;
export default ArticleSlice.reducer;
