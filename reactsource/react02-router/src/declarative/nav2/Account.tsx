import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
    const id = 1
  return (
    <>
      <nav className="flex bg-blue-200 p-2 gap-5 h--20 items-center">
        <NavLink to="login">
          <span>Login</span>
        </NavLink>
        <NavLink to="register">
          <span>Register</span>
        </NavLink>
        <NavLink to={`profile/${id}`}>
          <span>Profile</span>
        </NavLink>
      </nav>
      {/* 하위 라우트의 컴포넌트가 렌더링 될 위치 지정 */}
      <Outlet />
    </>
  );
};

export default Account;
