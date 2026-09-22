import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Board, BoardUpSert } from "../types/board";

const BoardForm = ({
  onSubmit,
  board,
}: {
  onSubmit: (board: BoardUpSert) => void;
  board?: BoardUpSert;
}) => {
  // board가 들어오면 수정, board가 안 들어오면 새글 작성
  // BoardForm이 처음 나타날때 이 값으로 시작
  const [form, setForm] = useState<Pick<Board, "title" | "body" | "userId">>(
    board ?? {
      title: "",
      body: "",
      userId: 1,
    },
  );

  const { title, body } = form;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">게시글 {!board ? "작성" : "수정"}</h1>
        <p className="mt-2 text-slate-500">
          {!board ? "새로운 게시글을 작성해주세요" : "게시글을 수정해주세요"}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="rounded-xl border border-slate-200 bg-white p-8"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-semibold">제목</label>

          <input
            type="text"
            name="title"
            value={title}
            placeholder="제목을 입력하세요"
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Content */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold">내용</label>

          <textarea
            rows={5}
            name="body"
            value={body}
            placeholder="내용을 입력하세요"
            onChange={handleChange}
            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-2">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium hover:bg-slate-50"
          >
            취소
          </button>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {!board ? "작성" : "수정"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardForm;
