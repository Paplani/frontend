import { Route, Routes } from "react-router-dom";
import "./App.css";
import CommentsApp from "./comments/CommentsApp";
import TopNavi from "./components/TopNavi";
import ReduxBasicApp from "./features/counter/ReduxBasicApp";
import TodoApp from "./todo/TodoApp";

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<ReduxBasicApp />} />
        <Route path="/redux-basic" element={<ReduxBasicApp />} />
        <Route path="/comments" element={<CommentsApp />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </>
  );
}

export default App;
