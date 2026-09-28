import { useEffect, useRef, useState } from "react";
import { deleteTask, getTasks, postTask, putTask } from "../apis/taskApi";
import type { TaskProps } from "../types/types";
import AddTask from "./AddTask";
import ListTask from "./ListTask";

const MainTask = () => {
  // 여행 계획
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  // 처음 접속 시 서버에서 데이터 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverData = await getTasks();
        setTasks(serverData);
      } catch (error) {
        console.log("할일 조회에 실패했습니다:", error);
      }
    };
    fetchData();
  }, []);

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
  const handleAddTask = async (text: string) => {
    try {
      const new_task = { text: text, done: false };
      const added_task = await postTask(new_task);
      setTasks([...tasks, added_task]);
    } catch (error) {
      console.log("할일 추가에 실패했습니다.", error);
    }
  };

  // 여행계획 수정 함수 : save 버튼 누르면 text 수정
  const handleUpdateTask = async (modifiedTask: TaskProps) => {
    try {
      const updatedTask = await putTask(String(modifiedTask.id), modifiedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      );
    } catch (error) {
      console.log("할일 수정에 실패했습니다.", error);
    }
  };

  //   const updatedTasks = tasks.map((task) =>
  //   task.id === modifiedTask.id ? modifiedTask : task,
  // );
  // setTasks(updatedTasks);

  // 여행계획 제거
  const handleRemoveTask = async (taskId: number) => {
    try {
      const remainTasks = await deleteTask(String(taskId));
      setTasks(remainTasks); // remainTasks는 전체목록을 받음. 이를 그대로 교체
    } catch (error) {
      console.log("여행계획 제거에 실패했습니다.", error);
    }
  };

  // 여행계획 완료
  const handleDoneTask = async (taskId: number) => {
    const targetTask = tasks.find((task) => task.id === taskId);
    if (!targetTask) return;
    await handleUpdateTask({
      ...targetTask,
      done: !targetTask.done,
    });
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
