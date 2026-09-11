import { Outlet } from "react-router-dom";

const CommonLayout = () => {
  return (
    <div>
      <header className="p-2.5 bg-gray-300">Outlet 컴포넌트</header>
      <article>
        <Outlet />
      </article>
      <footer className="p-2.5 bg-gray-300">공통 레이아웃</footer>
    </div>
  );
};

export default CommonLayout;
