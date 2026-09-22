import { useEffect, useRef, useState } from "react";
import AddTask from "./AddTask";
import ListTask from "./ListTask";

export type TaskProps = {
  id: number;
  text: string;
  done: boolean;
};

const initialTasks: TaskProps[] = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

let nextId = 3;

const MainTask = () => {
  // 여행 계획
  const [tasks, setTasks] = useState<TaskProps[]>(initialTasks);

  // 목록 맨 아래의 HTML 요소를 기억
  const bottomRef = useRef<HTMLDivElement>(null);

  // 이전 할 일 개수를 기억
  const previousCountRef = useRef(tasks.length);

  useEffect(() => {
    // 항목이 추가된 경우에만 스크롤, .current에 저장된 값은 변경되어도 컴포넌트가 리렌더이 안됨!
    if (tasks.length > previousCountRef.current) {
      bottomRef.current?.scrollIntoView({
        // ?.scrollIntoVies :
        behavior: "smooth",
        block: "end", // 요소가 화면 아래쪽에 오도록 정렬
      });
    }
    previousCountRef.current = tasks.length;
  }, [tasks.length]);

  // 여행계획 추가 함수
  const handleAddTask = (text: string) => {
    // tasks에 내용 추가, tasks.push('') 불가능
    setTasks([...tasks, { id: nextId++, text: text, done: false }]);
  };

  // 여행계획 수정 함수 : save 버튼 누르면 text 수정
  const handleUpdateTask = (modifiedTask: TaskProps) => {
    const updatedTasks = tasks.map((task) =>
      task.id === modifiedTask.id ? modifiedTask : task,
    );
    setTasks(updatedTasks);
  };

  // 여행계획 제거
  const handleRemoveTask = (taskId: number) => {
    // taskId에 0번부터 id 들어옴
    const remainTask = tasks.filter((task) => task.id !== taskId);
    setTasks(remainTask);
  };

  // 여행계획 완료
  const handleDoneTask = (taskId: number) => {
    // taskId와 일치한 task 찾아서 done값을 true로
    const doneTask = tasks.map((task) =>
      task.id == taskId ? { ...task, done: !task.done } : task,
    );
    setTasks(doneTask);
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-xl space-y-6 rounded-lg bg-white shadow-md">
        <h2 className="text-center text-2xl font-semibold">체코 프라하 여행</h2>
        <AddTask handleAddTask={handleAddTask} />
        <ListTask
          tasks={tasks}
          onEditTask={handleUpdateTask}
          onRemoveTask={handleRemoveTask}
          onToggleTask={handleDoneTask}
        />
        {/* 스크롤 목적지 추가 */}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default MainTask;
