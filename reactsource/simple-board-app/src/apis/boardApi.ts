import axios from "axios";
import type { BoardUpSert } from "../types/board";

const url = "http://127.0.0.1:8000/boards";

export const getBoards = async () => {
  const response = await axios.get(`${url}`);
  return response.data;
};

export const getBoard = async (id: string) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

// 삽입
export const putBoard = async (board: BoardUpSert) => {
  const response = await axios.post(`${url}`, board);
  return response.data;
};

// 삭제
export const deleteBoard = async (id: string) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

// 수정
export const updateBoard = async (id: string, board: BoardUpSert) => {
  const response = await axios.put(`${url}/${id}`, board);
  return response.data;
};

// 댓글 가져오기
export const getComment = async (id: string) => {
  const response = await axios.get(`${url}/${id}/comments`);
  return response.data;
};

//