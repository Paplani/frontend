import { Route, Routes } from "react-router-dom";
import "./App.css";
import CommonLayout from "./declarative/nav1/CommonLayout";
import Home from "./declarative/nav1/Home";
import LayoutIndex from "./declarative/nav1/LayoutIndex";
import NotFound from "./declarative/nav1/NotFound";
import TopNavi from "./declarative/nav1/TopNavi";
import RouterHooks from "./declarative/nav1/RouterHooks";

// react-router-dom
// Url 관리, 이력관리

// http://localhost:5173/intro
// http://localhost:5173/intro/router
// ...

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<CommonLayout />}>
          {/* index는 부모 Route 주소에 정확히 접속했을 때 기본으로 보여줄 자식 컴포넌트에만 사용 */}
          {/* index 사용 조건 */}
          {/* 부모 Route가 있고, 그 부모 주소와 정확히 일치할 때 Outlet에 기본으로 보여줄 자식이 필요한 경우 */}
          <Route index element={<LayoutIndex />} />
          <Route path="router" element={<RouterHooks />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
