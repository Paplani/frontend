import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, type LoginFormState } from "../common/AuthContext";

const LoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({
    id: "",
    password: "",
  });

  const { id, password } = form;

  const context = useAuth();

  const navigate = useNavigate();

  // 아이디 비번 input창에서 입력받은거 바로바로 form으로 기록
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!id.trim() || !password.trim()) return alert("아이디나 비밀번호를 확인해주세요");

    // login() 함수 사용
    const { login } = context;
    login(id, password);

    // mypage로 이동하기
    navigate("/mypage");
  };

  const { isLoggedIn } = context;
  if (isLoggedIn) {
    return <p>이미 로그인된 상태입니다</p>;
  }

  return (
    <main className="flex min-h-[calc(100vh-65px)] items-center justify-center bg-gray-50 px-4">
      <section className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              M
            </div>

            <h2 className="text-2xl font-bold text-gray-900">로그인</h2>

            <p className="mt-2 text-sm text-gray-500">My Page에 로그인해보세요.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="id"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                아이디
              </label>

              <input
                name="id"
                id="id"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>

              <input
                name="password"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 active:bg-blue-800"
            >
              로그인
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-500 transition hover:text-blue-600">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          이 페이지는 서버 없이 React 상태 관리 기능을 학습하기 위한
          <br />
          로그인 예제입니다.
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
