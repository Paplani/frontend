// 서버로부터 내려올 데이터 타입

export type Board = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type BoardComment = Board & {comments:CommentType[]}

// create (title, body, userId) 필요
// update (id, title, body, userId) 필요
export type BoardUpSert = Omit<Board, "id"> & {id?:number}