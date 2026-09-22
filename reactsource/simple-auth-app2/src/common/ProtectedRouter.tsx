import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks";

const ProtectedRouter = () => {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.id) {
    return <Navigate to={"/login"} replace />;
  }

  // 로그인 정보가 있다면 자식 Route 보여주기
  return <Outlet />;
};

export default ProtectedRouter;
