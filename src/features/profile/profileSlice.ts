import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InformationUser } from "models/user.model";
export interface ProfileState {
  loading?: boolean;
  loadingFollow: boolean;
  author: InformationUser;
}
const initialState: ProfileState = {
  loading: false,
  loadingFollow: false,
  author: {
    username: "",
    bio: "",
    image: "",
    following: false,
  },
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfile: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchProfileSuccess: (state, action: PayloadAction<InformationUser>) => {
      state.loading = false;
      state.author = action.payload;
    },
    fetchProfileFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.author = {
        username: "",
        bio: "",
        image: "",
        following: false,
      };
    },
    followProfile: (state, action: PayloadAction<{ username: string; type: "follow" | "unfollow" }>) => {
      state.loadingFollow = true;
    },
    followProfileSuccess: (state, action: PayloadAction<string>) => {
      const type = action.payload === "follow" ? true : false;
      state.loadingFollow = false;
      state.author.following = type;
    },
    followProfileFailed: (state) => {
      state.loadingFollow = false;
    },
  },
});
export const {
  fetchProfile,
  fetchProfileFailed,
  fetchProfileSuccess,
  followProfile,
  followProfileSuccess,
  followProfileFailed,
} = profileSlice.actions;
export const selectLoadingProfile = (state: RootState) => state.profile.loading;
export const selectLoadingFollowProfile = (state: RootState) => state.profile.loadingFollow;
export const selectAuthor = (state: RootState) => state.profile.author;
export default profileSlice.reducer;
