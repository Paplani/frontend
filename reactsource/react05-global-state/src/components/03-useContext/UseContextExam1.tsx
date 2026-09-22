import { useContext } from "react";
import { ThemeContext } from "./CommonContext";
import ThemeBox from "./ThemeBox";
import ThemeProvider from "./ThemeProvider";

const ThemeToggleButton = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext is Null");
  }
  const { toggleTheme } = context;

  return (
    <div className="flex justify-center">
      <button
        className="border rounded-2xl border-amber-600 px-4 mt-4 font-semibold"
        onClick={toggleTheme}
      >
        테마전환
      </button>
    </div>
  );
};

const UseContextExam1 = () => {
  return (
    <div>
      <h2 className="text-3xl text-center">useContext 예제1</h2>
      {/* 3. 상태를 공유할 자식 컴포넌트들을 Provider로 감싸기 */}
      <ThemeProvider>
        <ThemeToggleButton />
        <ThemeBox />
      </ThemeProvider>
    </div>
  );
};

export default UseContextExam1;
