import { useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import type { TaskProps } from "./MainTask";

type TaskListProps = {
  tasks: TaskProps[];
  onEditTask: (task: TaskProps) => void;
  onRemoveTask: (taskId: number) => void;
  onToggleTask: (taskId: number) => void;
};

// Omit<타입명, "제거할 속성">
type TaskItemProps = Omit<TaskListProps, "tasks"> & {
  task: TaskProps;
};

const ItemTask = ({
  task,
  onEditTask,
  onRemoveTask,
  onToggleTask,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  //   const [isDone, setIsDone] = useState(task.done);
  const [listText, setListText] = useState(task.text);

  // 편집 저장 함수
  const onSave = () => {
    const modifiedTask = { ...task, text: listText };
    if (listText.trim() === "") return alert("여행 계획을 입력해주세요.");
    onEditTask(modifiedTask);
    // 다시 입력칸 숨기고 save 버튼이 edit 버튼으로 바뀌도록
    const changeEdit = !isEditing;
    setIsEditing(changeEdit);
  };

  // 편집 시작 함수
  const startEditing = () => {
    const changedEdit = !isEditing;
    setIsEditing(changedEdit);
    setListText(""); // 수정할때 빈칸으로 보이도록
  };

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-3 w-full mr-2">
        {/* 완료여부 체크 박스 */}
        <button type="button" onClick={() => onToggleTask(task.id)}>
          {task.done ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
        {isEditing ? (
          <input
            type="text"
            name="text"
            className="rounded-md border p-2 w-full shadow-sm"
            value={listText}
            onChange={(e) => setListText(e.target.value)}
          />
        ) : (
          <span className="text-gray-800">{task.text}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={isEditing ? onSave : startEditing}
          className="rounded border px-3 py-2 text-sm text-green-600 hover:text-green-800"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          type="button"
          onClick={() => onRemoveTask(task.id)}
          className="rounded border px-3 py-2 text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ListTask = ({
  tasks,
  onEditTask,
  onRemoveTask,
  onToggleTask,
}: TaskListProps) => {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <ItemTask
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onRemoveTask={onRemoveTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </div>
  );
};

export default ListTask;
