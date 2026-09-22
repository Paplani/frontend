import { NavLink } from "react-router-dom";

const TopNavi = () => {
  return (
    <nav className="flex bg-gray-300 p-2 gap-5 h-20 items-center">
      <NavLink to="/use-ref1">useRef1</NavLink>
      <NavLink to="/use-ref2">useRef2</NavLink>
      <NavLink to="/use-memo">useMemo</NavLink>
      <NavLink to="/use-callback">useCallback</NavLink>
      <NavLink to="/use-id">useId</NavLink>
    </nav>
  );
};

export default TopNavi;
