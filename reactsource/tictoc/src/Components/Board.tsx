import { useState } from "react";
import type { boards } from "../types/types";
import { calculateWinner } from "../utils/util";
import Square from "./Square";

const Board = ({ isNext, squares, handlePlay }: boards) => {
  // 9개의 Square의 state 관리
  // const initialSquares = [null,null, null ...]

  // 부모에서 관리
  // const initialSquares: Squares = Array(9).fill(null);
  // const [squares, setSquares] = useState(initialSquares);

  const [resultSentence, setResultSentence] =
    useState("게임 결과가 표시될 자리");

  const handleClick = (idx: number) => {
    // 현재 승자가 있는지 체크하고 게임 진행 판단
    if (calculateWinner(squares) !== null) return;

    // 이미 선택된 박스라면 선택이 안되야 함
    if (squares[idx]) return;

    // ... === slice()
    // const oldSquares = [...squares]
    const copySquares = squares.slice(); // 배열 복사하는 다른 방법

    if (isNext) {
      copySquares[idx] = "X";
    } else {
      copySquares[idx] = "O";
    }

    const winner = calculateWinner(copySquares);
    if (winner === "X" || winner === "O") {
      setResultSentence(`${winner}가 이겼습니다!`);
    } else if (isNext === true) {
      setResultSentence("Next Player: O");
    } else {
      setResultSentence("Next Player: X");
    }

    // setIsNext(!isNext);
    // setSquares(copySquares);
    handlePlay(copySquares);

    // 무승부 체크하기 : null값 다 없고 9번째 수에서 승자가 없어야함
    const checkDraw = copySquares.filter((square) => square == null);
    if (winner == null && checkDraw.length == 0) {
      setResultSentence("무승부입니다!");
    }
  };

  return (
    <div className="game">
      <div className="status">{resultSentence}</div>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} handleClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} handleClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} handleClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} handleClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} handleClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} handleClick={() => handleClick(8)}></Square>
      </div>
    </div>
  );
};

export default Board;
