import axios from "axios";
import type { TaskCreate, TaskProps } from "../types/types";

const url = "http://127.0.0.1:8000/tasks";

// 전체 조회
export const getTasks = async () => {
  const result = await axios.get(`${url}`);
  return result.data;
};

// 하나만 조회
export const getTask = async (id: string) => {
  const result = await axios.get(`${url}/${id}`);
  return result.data;
};

// 할일 추가
export const postTask = async (task: TaskCreate) => {
  const response = await axios.post(`${url}`, task);
  return response.data;
};

// 삭제
export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

// 수정
export const putTask = async (id: string, task: TaskProps) => {
  const response = await axios.put(`${url}/${id}`, task);
  return response.data;
};
