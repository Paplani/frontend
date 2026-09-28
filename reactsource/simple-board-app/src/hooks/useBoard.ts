import { useEffect, useState } from "react";
import { getBoard, getComment } from "../apis/boardApi";
import type { BoardComment } from "../types/board";


// Custom Hook
// 게시글과 댓글을 조회하는 훅
const useBoard = (id: string | undefined) => {
  const [board, setBoard] = useState<BoardComment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // id 없는 경우 처리
        if (!id) return;

        // 서버로 요청
        const serverData = await getBoard(id);

        const serverCommentData = await getComment(id);

        setBoard({
          userId: serverData.userId,
          id: serverData.id,
          title: serverData.title,
          body: serverData.body,
          comments: serverCommentData,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { board, loading };
};

export default useBoard;
