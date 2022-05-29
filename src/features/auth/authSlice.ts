import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { InformationUser, UserLogin } from "../../models/user.model";
export interface UserState {
  logging?: boolean;
  currentUser?: InformationUser;
}
const initialState: UserState = {
  logging: false,
  currentUser: undefined,
};
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserLogin>) => {
      state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<InformationUser>) => {
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.logging = false;
    },
    logout(state) {
      localStorage.clearItem("access_token");
      state.currentUser = undefined;
    },
  },
});
export const { login, loginSuccess, loginFailed, logout } = userSlice.actions;
export const selectLogging = (state: RootState) => state.user.logging;
export default userSlice.reducer;
