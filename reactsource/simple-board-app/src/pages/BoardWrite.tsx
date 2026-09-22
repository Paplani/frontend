import { useNavigate } from "react-router-dom";
import { putBoard } from "../apis/boardApi";
import BoardForm from "../components/BoardForm";
import type { BoardUpSert } from "../types/board";

const BoardWrite = () => {
  const navigate = useNavigate();

  // submit 시 실행할 함수

  const onSubmit = async (board: BoardUpSert) => {
    if (!board.title.trim() || !board.body.trim()) {
      alert("제목과 내용을 입력해주세요");
      return;
    }

    try {
      // 입력에 대한 결과
      const result = await putBoard(board);
      console.log(result);
      navigate("/boards");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BoardForm onSubmit={onSubmit} />
    </div>
  );
};

export default BoardWrite;
