import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types

export default store;
