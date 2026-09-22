import { NavLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <NavLink to="/" className="text-xl font-bold tracking-tight">
            💻 Dev BOARD
          </NavLink>

          <nav className="flex items-center gap-8 text-sm">
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }
            >
              게시판
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }
            >
              소개
            </NavLink>

            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              로그인
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* URL 에 따라 달라질 부분 */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-400">
          © 2026 BOARD. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
