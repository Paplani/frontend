import { NavLink } from "react-router-dom";

const TopNavi = () => {
  return (
    <nav className="flex h-16 items-center justify-center gap-6 bg-white px-8 shadow-sm">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-blue-600 font-semibold" : "px-4 py-2"
        }
      >
        생명주기
      </NavLink>
      <NavLink
        to={"/local"}
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-blue-600 font-semibold" : "px-4 py-2"
        }
      >
        내부통신
      </NavLink>
      <NavLink
        to={"/external"}
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-blue-600 font-semibold" : "px-4 py-2"
        }
      >
        외부통신
      </NavLink>
      <NavLink
        to={"/books"}
        className={({ isActive }) =>
          isActive ? "px-4 py-2 text-blue-600 font-semibold" : "px-4 py-2"
        }
      >
        도서정보
      </NavLink>
    </nav>
  );
};

export default TopNavi;
