import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRouter from "./common/ProtectedRouter";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import MyPage from "./components/MyPage";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
