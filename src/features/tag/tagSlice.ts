import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
export interface TagState {
  loading: boolean;
  tags: string[];
  tagsSearch: string;
}
const initialState: TagState = {
  loading: false,
  tags: [],
  tagsSearch: "",
};
const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    fetchTags: (state) => {
      state.loading = true;
    },
    fetchTagSuccess: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.tags = action.payload;
    },
    fetchTagFailed: (state) => {
      state.loading = false;
    },
    addTag: (state, action: PayloadAction<string>) => {
      state.tagsSearch = action.payload;
    },
    removeTag: (state) => {
      state.tagsSearch = "";
    },
  },
});
export const { fetchTags, fetchTagFailed, fetchTagSuccess, addTag, removeTag } = tagSlice.actions;

export const selectTagsList = (state: RootState) => state.tags.tags;
export const selectTagsSearchList = (state: RootState) => state.tags.tagsSearch;
export const selectLoading = (state: RootState) => state.tags.loading;

const tagReducer = tagSlice.reducer;
export default tagReducer;
