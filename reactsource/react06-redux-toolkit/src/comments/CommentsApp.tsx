import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addComment, clearComment, deleteComment } from "./commentsSlice";

const CommentsApp = () => {
  const comments = useAppSelector((state) => state.myComment.comments);
  const dispatch = useAppDispatch();

  const [contents, setContents] = useState("");

  return (
    <div>
      <div className="flex flex-col mx-6">
        <h2 className="text-3xl mt-3">Comments Redux 적용</h2>
        <ul className="border-b-2 my-2 p-2">
          {comments.map((comment) => (
            <li key={comment.id}>
              <span>
                {comment.contents} : {new Date(comment.id).toLocaleTimeString("ko-KR")}
              </span>
              <button
                className="bg-red-200 p-2 mx-1 text-white"
                onClick={() => {
                  dispatch(deleteComment(comment.id));
                }}
              >
                댓글삭제
              </button>
            </li>
          ))}
        </ul>

        <textarea
          name="contents"
          rows={10}
          className="border p-4"
          placeholder="댓글을 입력해주세요"
          autoFocus
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
        <div className="flex justify-center [&_button]:border [&_button]:rounded-xl [&_button]:shadow-xm">
          <button
            className="bg-gray-400 p-2 mx-1"
            onClick={() => {
              dispatch(addComment(contents));
              setContents("");
            }}
          >
            댓글추가
          </button>
          <button
            className="bg-violet-400 p-2 mx-1"
            onClick={() => {
              dispatch(clearComment());
            }}
          >
            전체삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsApp;
