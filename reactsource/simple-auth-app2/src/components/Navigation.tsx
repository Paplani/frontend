import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Navigation = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition ${
      isActive ? "font-semibold text-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;

  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          My Page
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm">
          <NavLink to="/" className={getLinkClass}>
            홈
          </NavLink>

          {auth.id ? (
            <>
              <NavLink to="/mypage" className={getLinkClass}>
                마이페이지
              </NavLink>
              <button
                className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-gray-700"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
