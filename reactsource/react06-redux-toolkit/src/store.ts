import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comments/commentsSlice";
import counterReducer from "./features/counter/counterSlice";
import todoReducer from "./todo/todoSlice";

const store = configureStore({
  reducer: {
    myCounter: counterReducer,
    myComment: commentReducer,
    myTodo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be reused to resolve types

export default store;
