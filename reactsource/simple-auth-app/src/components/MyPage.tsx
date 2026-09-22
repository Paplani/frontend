import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../common/AuthContext";
//import { useAuth } from "../common/AuthContext";

const MyPage = () => {
  const context = useAuth();
  const { id, logout } = context;
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">MY PAGE</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            마이페이지
          </h2>

          <p className="mt-2 text-gray-500">로그인한 사용자의 정보를 확인.</p>
        </div>

        {/* User Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Profile */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {/* 사용자 이름의 첫글자 */} {id.charAt(0)}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-gray-400">로그인 사용자</p>

              <h3 className="mt-1 text-2xl font-bold text-gray-900">
                {/* 사용자 이름 */} {id}
              </h3>

              <p className="mt-1 text-sm text-gray-500">현재 로그인되어 있습니다.</p>
            </div>

            {/* Logout */}
            <button
              className="rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-400">인증 상태</p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="font-semibold text-gray-900">로그인 상태</span>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Context에 저장된 사용자 정보를 통해 현재 로그인 상태 확인
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-400">사용 기술</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-600">
                useState
              </span>

              <span className="rounded-md bg-purple-50 px-3 py-1 text-sm text-purple-600">
                useReducer
              </span>

              <span className="rounded-md bg-green-50 px-3 py-1 text-sm text-green-600">
                useContext
              </span>

              <span className="rounded-md bg-orange-50 px-3 py-1 text-sm text-orange-600">
                React Router
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-500 transition hover:text-blue-600">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
