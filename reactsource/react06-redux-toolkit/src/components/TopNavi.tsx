import { NavLink } from "react-router-dom";

const TopNavi = () => {
  return (
    <div>
      <nav className="flex bg-gray-300 p-2 gap-5 h-20 items-center justify-center">
        <NavLink to="/redux-basic">ReduxBasicApp</NavLink>
        <NavLink to="/comments">CommentsApp</NavLink>
        <NavLink to="/todos">TodoApp</NavLink>
      </nav>
    </div>
  );
};

export default TopNavi;
