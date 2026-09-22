import { Route, Routes } from "react-router-dom";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import StartScreen from "./components/StartScreen";

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col">
      <header className="border-b border-teal-100 text-center bg-white px-6 py-5">
        <div className="mx-auto max-w-3xl">
          <p className="mb-1 text-xs font-semibold tracking-widest text-teal-700">
            {/* tracking-widest : 글자사이의 간격을 가장 넓게 설정, leading-5: 텍스트의 줄 간격 1.25rem으로 설정*/}
            MY TRAVEL STYLE
          </p>
          <h1>나의 여행 스타일 테스트</h1>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        {/* flex-1 : 상단과 하단을 제외한 남은 공간 차지 */}
        <div
          className="w-full max-w-2xl rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-10 
          [&_section]:space-y-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:font-semibold [&_p]:leading-7 [&_p]:text-slate-600
          [&_button]:rounded-xl [&_button]:bg-teal-700 [&_button]:px-5 [&_button]:py-3 [&_button]:text-white [&_button]:cursor-pointer [&_button:hover]:bg-teal-800
          [&_ul]:space-y-3 [&_li>button]:w-full [&_li>button]:text-left [&_button+button]:ml-3 [&_progress]:w-full [&_progress]:accent-teal-600"
        >
          {/* sm:p-10 => 모바일에서는 기본패딩 유지하다가 화면이 640px 이상으로 커지면 내부 여백 2.5rem 으로 확대 */}
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/test" element={<QuestionScreen />} />
            <Route path="/result" element={<ResultScreen />} />
          </Routes>
        </div>
      </main>
      <footer className="px-6 pb-6 text-center text-xs leading-5 text-slate-500">
        <p>재미로 알아보는 여행 스타일이며, 심리검사나 성격 진단이 아닙니다.</p>
      </footer>
    </div>
  );
}

export default App;
