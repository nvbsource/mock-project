import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Comment } from "models/article.model";
import { CommentUpload } from "../../models/article.model";

export interface ArticleState {
  loading: boolean;
  loadingAdd: boolean;
  comments: Comment[];
}
const initialState: ArticleState = {
  loading: false,
  loadingAdd: false,
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchComments: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false;
      state.comments = action.payload
        .slice()
        .sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        })
        .reverse();
    },
    fetchCommentsFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },
    addComment: (state, action: PayloadAction<CommentUpload>) => {
      state.loadingAdd = true;
    },
    deleteComment: (state, action: PayloadAction<{ slug: string; idComment: number }>) => {},
    deleteCommentSuccess: (state, action: PayloadAction<number>) => {
      const index = state.comments.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.comments.splice(index, 1);
      }
    },
    addCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.loadingAdd = false;
      state.comments = [action.payload, ...state.comments];
    },
    addCommentFailed: (state) => {
      state.loadingAdd = false;
    },
  },
});

export const {
  fetchComments,
  fetchCommentsFailed,
  fetchCommentsSuccess,
  addComment,
  addCommentSuccess,
  deleteComment,
  addCommentFailed,
  deleteCommentSuccess,
} = commentSlice.actions;

export const selectLoading = (state: RootState) => state.comment.loading;
export const selectLoadingAdd = (state: RootState) => state.comment.loadingAdd;
export const selectComments = (state: RootState) => state.comment.comments;

export default commentSlice.reducer;
