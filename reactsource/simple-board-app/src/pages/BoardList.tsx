import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBoards } from "../apis/boardApi";
import type { Board } from "../types/board";

const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverData = await getBoards();
        setBoards(serverData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-8 text-sm text-slate-400">
        Home <span className="mx-2">/</span>
        <span className="text-slate-600">게시판</span>
      </div>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">자유게시판</h1>

          <p className="mt-2 text-slate-500">다양한 이야기를 자유롭게 나눠보세요.</p>
        </div>

        <Link
          to="/boards/write"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          ✍️ 글쓰기
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6 flex gap-2">
        <select className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500">
          <option>제목 + 내용</option>
          <option>제목</option>
          <option>작성자</option>
        </select>

        <div className="flex flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 px-4 py-3 text-sm outline-none"
          />

          <button className="px-5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            검색
          </button>
        </div>
      </div>

      {/* Count */}
      <div className="mb-3 text-sm text-slate-500">
        전체 <span className="font-semibold text-slate-900">128</span>개의 게시글
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="w-20 px-6 py-4 text-center font-medium text-slate-500">
                번호
              </th>

              <th className="px-6 py-4 text-left font-medium text-slate-500">제목</th>

              <th className="w-32 px-6 py-4 text-center font-medium text-slate-500">
                작성자
              </th>

              <th className="w-32 px-6 py-4 text-center font-medium text-slate-500">
                작성일
              </th>

              <th className="w-24 px-6 py-4 text-center font-medium text-slate-500">
                조회
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {boards.map((post) => (
              <tr key={post.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-5 text-center text-slate-400">
                  {boards.length + 1 - post.id}
                </td>

                <td className="px-6 py-5">
                  <Link
                    to={`/boards/${post.id}`}
                    className="font-medium text-slate-800 hover:text-indigo-600"
                  >
                    {post.title}
                  </Link>
                </td>

                <td className="px-6 py-5 text-center text-slate-500">{post.userId}</td>

                <td className="px-6 py-5 text-center text-slate-400">2026.09.18</td>

                <td className="px-6 py-5 text-center text-slate-400">28</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-1">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-400 hover:bg-white">
          ‹
        </button>

        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
              page === 1
                ? "bg-indigo-600 font-semibold text-white"
                : "text-slate-500 hover:bg-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-sm text-slate-400 hover:bg-white">
          ›
        </button>
      </div>
    </div>
  );
};

export default BoardList;
