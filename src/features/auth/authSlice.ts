import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { UserLogin, UserRegister } from "../../models/user.model";
export interface UserState {
  registerLoading: boolean;
  logging: boolean;
}
const initialState: UserState = {
  registerLoading: false,
  logging: false,
};
export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserLogin>) => {
      state.logging = true;
    },
    loginSuccess: (state) => {
      state.logging = false;
    },
    loginFailed: (state) => {
      state.logging = false;
    },
    logout(state) {},
    register(state, action: PayloadAction<UserRegister>) {
      state.registerLoading = true;
    },
    registerSuccess(state) {
      state.registerLoading = false;
    },
  },
});
export const { login, loginSuccess, loginFailed, logout, register, registerSuccess } = userSlice.actions;
export const selectLogging = (state: RootState) => state.user.logging;
export const selectRegisterLoading = (state: RootState) => state.user.registerLoading;
export default userSlice.reducer;
