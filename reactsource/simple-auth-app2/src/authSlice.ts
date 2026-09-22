import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoginFormState {
  id: string;
  password: string;
}

export const initialState: LoginFormState = {
  id: "",
  password: "",
};

// 등록, 삭제, 전체삭제
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginFormState>) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.id = "";
      state.password = "";
    },
  },
});

// 액션함수 내보내기
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
