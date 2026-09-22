import type { ReactNode } from "react";

const TodoTemplate = ({ children }: { children: ReactNode }) => {
  console.log("TodoTemplate rendered");

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-3/5 bg-cyan-800 p-3 text-center text-3xl text-white">
        일정관리
      </div>
      <div className="w-3/5 bg-white">{children}</div>
    </div>
  );
};

export default TodoTemplate;
