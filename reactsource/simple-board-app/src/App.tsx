import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./common/AppLayout";
import Home from "./common/Home";
import BoardDetail from "./pages/BoardDetail";
import BoardEdit from "./pages/BoardEdit";
import BoardList from "./pages/BoardList";
import BoardWrite from "./pages/BoardWrite";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/boards">
            <Route index element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path=":id" element={<BoardDetail />} />
            <Route path=":id/edit" element={<BoardEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
