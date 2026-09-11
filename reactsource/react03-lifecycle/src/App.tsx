import { Route, Routes } from "react-router-dom";
import "./App.css";
import BookJsonFetcher from "./BookJsonFetcher";
import ExternalApiFetcher from "./ExternalApiFetcher";
import LifeCycle from "./LifeCycle";
import LocalJsonFetcher from "./LocalJsonFetcher";
import TopNavi from "./TopNavi";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-200">
        <TopNavi />
        <Routes>
          <Route path="/" element={<LifeCycle />} />
          <Route path="/local" element={<LocalJsonFetcher />} />
          <Route path="/external" element={<ExternalApiFetcher />} />
          <Route path="/books" element={<BookJsonFetcher />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
