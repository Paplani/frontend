import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  contents: string;
}

interface CommentState {
  comments: Comment[];
}

export const initialState: CommentState = {
  comments: [],
};

// 등록, 삭제, 전체삭제
const commentSlice = createSlice({
  name: "myComments",
  initialState: initialState,
  reducers: {
    addComment: (state, action: PayloadAction<string>) => {
      state.comments.push({ id: Date.now(), contents: action.payload });
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    clearComment: (state) => {
      state.comments = [];
    },
  },
});

// 액션함수 내보내기
export const { addComment, deleteComment, clearComment } = commentSlice.actions;

export default commentSlice.reducer;
