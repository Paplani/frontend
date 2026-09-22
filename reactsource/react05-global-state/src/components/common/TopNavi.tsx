import { NavLink } from "react-router-dom";

const TopNavi = () => {
  return (
    <div>
      <nav className="flex bg-gray-300 p-2 gap-5 h-20 items-center justify-center">
        <NavLink to="/use-state">useState</NavLink>
        <NavLink to="/use-reducer1">useReducer1</NavLink>
        <NavLink to="/use-reducer2">useReducer2</NavLink>
        <NavLink to="/use-reducer3">useReducer3</NavLink>
        <NavLink to="/todo-reducer">todoReducer</NavLink>
        <NavLink to="/use-context1">useContext1</NavLink>
        <NavLink to="/use-context2">useContext2</NavLink>
      </nav>
    </div>
  );
};

export default TopNavi;
