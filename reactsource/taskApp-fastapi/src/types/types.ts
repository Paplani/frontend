export type TaskProps = {
  id: number;
  text: string;
  done: boolean;
};

export type TaskCreate = Omit<TaskProps, "id">;

export type TaskListProps = {
  tasks: TaskProps[];
  onEditTask: (task: TaskProps) => void;
  onRemoveTask: (taskId: number) => void;
  onToggleTask: (taskId: number) => void;
};

// Omit<타입명, "제거할 속성">
export type TaskItemProps = Omit<TaskListProps, "tasks"> & {
  task: TaskProps;
};
