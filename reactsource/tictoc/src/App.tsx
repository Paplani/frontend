import { useState } from "react";
import "./App.css";
import Board from "./Components/Board";
import type { Squares } from "./types/types";

function App() {
  // X,O 관리
  const [isNext, setIsNext] = useState(true);
  // history 관리
  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);
  // 이동변수
  const [currentMove, setCurrentMove] = useState(0);

  // 이전 history 변수
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquare: Squares) => {
    // slice는 끝번호를 포함하지 않음
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory); // 과거의 특정수로 이동하고 현재의 수를 새로운 히스토리로 기록
    setCurrentMove(nextHistory.length - 1);
    setIsNext(!isNext);
    console.log(history);
  };

  // history 보여주기
  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
    setIsNext(nextMove % 2 == 0);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move} className="mt-0.5">
        <button className="bg-gray-300 p-2" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="game-layout">
        <Board
          isNext={isNext}
          squares={currentSquares}
          handlePlay={handlePlay}
        />
        <ul>
          <li>게임기록</li>
          <ol>{moves}</ol>
        </ul>
      </div>
    </>
  );
}

export default App;
