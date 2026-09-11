// 승자 계산하는 함수

import type { Squares } from "../types/types";

export function calculateWinner(squares: Squares) {
  const corrects = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 위에 정답하고 맞는지 확인해야함. squares로 가져오는걸 어캐 처리하면 되는거지
  // correct를 하나하나 각각 쪼개서 [0,1,2] 를 [0],[1],[2] 로 쪼갠 다음에 해당하는 squares의 인덱스로 가서 그 값들이 다 같은지 확인하면 되는거 아니야?
  // for...in은 **키(배열에서는 인덱스)**를 꺼내고, for...of는 값을 꺼내요.
  // 객체의 속성 이름을 순회할 때는 in, 배열의 값을 순회할 때는 of
  for (const [i1, i2, i3] of corrects) {
    if (
      squares[i1] &&
      squares[i1] === squares[i2] &&
      squares[i2] === squares[i3]
    )
      return squares[i1]; // 승리한 값 'X' , 'O'인지 알려줌
  }
  return null;
}
