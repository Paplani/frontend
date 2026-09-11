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
        {isEditing ? (
          <button
            type="button"
            onClick={() => {
              const modifiedTask = { ...task, text: listText };
              onEditTask(modifiedTask);
              // 다시 입력칸 숨기고 save 버튼이 edit 버튼으로 바뀌도록
              const changedEdit = !isEditing;
              setIsEditing(changedEdit);
            }}
            className="rounded border px-3 py-2 text-sm text-green-600 hover:text-green-800"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              const changedEdit = !isEditing;
              setIsEditing(changedEdit);
            }}
            className="rounded border px-3 py-2 text-sm text-green-600 hover:text-green-800"
          >
            Edit
          </button>
        )}

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
