import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  idx: number;
  contents: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

// 등록, 삭제, 전체삭제, done 수정(t->f)
const todoSlice = createSlice({
  name: "myTodos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ idx: Date.now(), contents: action.payload, done: false });
    },
    updateTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => (todo.idx === action.payload));
      if(todo){
        todo.done = !todo.done
      }
    },
    deleteTodo: (state, action:PayloadAction<number>) => {
      state.todos = state.todos.filter((todo)=>todo.idx!==action.payload)
    },
    clearTodo:(state)=>{
        state.todos = []
    }
  },
});

// 액션함수 내보내기
export const { addTodo, updateTodo, deleteTodo, clearTodo } = todoSlice.actions;

export default todoSlice.reducer;
