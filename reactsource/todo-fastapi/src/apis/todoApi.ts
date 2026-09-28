// 서버로 데이터 전송, 데이터 가져오기기 => fetch(), axios

import axios from "axios";
import type { TodoCreate } from "../types/todo";

// 128.0.0.1 == localhost
const url = "http://127.0.0.1:8000/todos";

// export const getTodos = async () => {
//   const response = await axios.get(`${url}`);
//   return response.data;
// };

export const getTodos = async (completedFilter: boolean | null) => {
  // completedFilter null => {}
  // completedFilter t/f => {completed:completedFilter}
  const params = completedFilter === null ? {} : { completed: completedFilter };
  const response = await axios.get(`${url}/`, { params });
  return response.data;
};

export const getTodo = async (id: string) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

// 삽입
export const postTodo = async (todo: TodoCreate) => {
  const response = await axios.post(`${url}/`, todo);
  return response.data;
};

// 삭제   id를 넘버로 받아도 url을 만들때 문자열로 표현됨
export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

// 수정
export const putTodo = async (id: string, todo: { completed: boolean }) => {
  const response = await axios.put(`${url}/${id}`, todo);
  return response.data;
};

// 댓글 가져오기
export const getComment = async (id: string) => {
  const response = await axios.get(`${url}/${id}/comments`);
  return response.data;
};
