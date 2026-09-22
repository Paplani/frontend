import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const Home = () => {
  // redux-toolkit
  const auth = useAppSelector((state) => state.auth);

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-50">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        {/* Badge */}
        <span className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
          React Authentication
        </span>

        {/* Title */}
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          간단한 로그인 앱
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
          useState, useReducer, useContext와 React Router를 활용한
          <br />
          로그인 · 로그아웃 실습 프로젝트.
        </p>

        {/* Button */}
        <div className="mt-8 flex gap-3">
          {auth.id ? (
            <Link
              to="/mypage"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              마이페이지
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              로그인
            </Link>
          )}
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid w-full max-w-4xl gap-5 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
              S
            </div>

            <h3 className="font-semibold text-gray-900">useState</h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              로그인 폼의 입력값과 같은 간단한 상태 관리
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-lg">
              R
            </div>

            <h3 className="font-semibold text-gray-900">useReducer</h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              로그인과 로그아웃에 따른 인증 상태 관리.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-lg">
              C
            </div>

            <h3 className="font-semibold text-gray-900">useContext</h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              여러 컴포넌트에서 로그인 상태 공유
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
