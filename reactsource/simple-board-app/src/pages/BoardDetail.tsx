import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBoard } from "../apis/boardApi";
import useBoard from "../hooks/useBoard";

const BoardDetail = () => {
  const navigate = useNavigate();

  // 주소 경로에 있는 id 가져오기
  const { id } = useParams();

  // 여기서 board의 모든 내용을 다 가져옴 (댓글 포함)
  const { board, loading } = useBoard(id);

  const onDelete = async (id: string) => {
    try {
      const result = await deleteBoard(id);
      console.log(result);
      navigate("/boards");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  // 하나 가져와서 화면에 보여주기

  return (
    <div>
      <div className="mb-8 text-sm text-slate-400">
        Home <span className="mx-2">/</span>
        게시판 <span className="mx-2">/</span>
        <span className="text-slate-600">게시글</span>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="border-b border-slate-200 px-8 py-7">
          <h1 className="text-2xl font-bold">{board?.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <span className="font-medium text-slate-600">철수</span>
            <span>2026.09.17 14:32</span>
            <span>조회 42</span>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px] px-8 py-10 leading-8 text-slate-700">
          <p>{board?.body}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between border-t border-slate-200 px-8 py-5">
          <Link
            to="/boards"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            목록
          </Link>

          <div className="flex gap-2">
            <button
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              onClick={() => navigate(`/boards/${id}/edit`)}
            >
              수정
            </button>

            <button
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              onClick={() => {
                if (!id) return;
                if (confirm("정말로 삭제하시겠습니까?")) {
                  onDelete(id);
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </article>
      {/* 댓글 보여주기 영역 posts/${id}/comments */}
      <section>
        <div className="flex flex-col ">
          <ul className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {board?.comments.map((comment) => (
              <li key={comment.id} className="px-5 py-4">
                <p className="mb-2 text-sm font-semibold text-indigo-600">
                  댓글 제목: {comment.name}
                </p>
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default BoardDetail;
