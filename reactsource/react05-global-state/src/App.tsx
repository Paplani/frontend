import { Route, Routes } from "react-router-dom";
import "./App.css";
import UseStateExam from "./components/01-useState/UseStateExam";
import UseReducerExam1 from "./components/02-useReducer/UseReducerExam1";
import UseReducerExam2 from "./components/02-useReducer/UseReducerExam2";
import UseReducerExam3 from "./components/02-useReducer/UseReducerExam3";
import UseContextExam1 from "./components/03-useContext/UseContextExam1";
import TopNavi from "./components/common/TopNavi";
import TodoMain from "./components/todo/TodoMain";
import UseContextExam2 from "./components/03-useContext/UseContextExam2";

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path="/" element={<UseStateExam />} />
        <Route path="/use-state" element={<UseStateExam />} />
        <Route path="/use-reducer1" element={<UseReducerExam1 />} />
        <Route path="/use-reducer2" element={<UseReducerExam2 />} />
        <Route path="/use-reducer3" element={<UseReducerExam3 />} />
        <Route path="/todo-reducer" element={<TodoMain />} />
        <Route path="/use-context1" element={<UseContextExam1 />} />
        <Route path="/use-context2" element={<UseContextExam2 />} />
      </Routes>
    </>
  );
}

export default App;
