export type Squares = ("X" | "O" | null)[];

export type boards = {
  isNext: boolean;
  squares: Squares;
  handlePlay: (nextSquares: Squares) => void;
};
