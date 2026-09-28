import { useNavigate, useParams } from "react-router-dom";
import { updateBoard } from "../apis/boardApi";
import BoardForm from "../components/BoardForm";
import useBoard from "../hooks/useBoard";
import type { BoardUpSert } from "../types/board";

const BoardEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { board } = useBoard(id);

  const onUpdate = async (targetBoard: BoardUpSert) => {
    if (!id) return;
    if (!targetBoard.body || !targetBoard.title) {
      alert("수정할 제목과 글을 입력해주세요");
      return;
    }
    try {
      const result = await updateBoard(id, targetBoard);
      console.log("수정된 board", result);
      navigate(`/boards/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!board) {
    return <p>게시글을 불러오는 중입니다.</p>;
  }

  return (
    <div>
      {/* Form */}
      <BoardForm onSubmit={onUpdate} board={board} />
    </div>
  );
};

export default BoardEdit;
