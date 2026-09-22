import React from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdNotificationImportant,
  MdRemoveCircleOutline,
} from "react-icons/md";
import type { TodoProps } from "./todo";

const TodoListItem = ({ todo, onDelete, onToggle }: TodoProps) => {
  //todo 분해하기
  const { id, title, completed, important } = todo;

  //todo 의 completed 값 변경해줘야함
  console.log("TodoListItem rendered");

  return (
    <div className="flex items-center p-4 even:bg-gray-200">
      <div className="flex grow items-center">
        <button type="button" onClick={() => onToggle(id)}>
          {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </button>
        <div className={`ml-2 flex items-center `}>
          {important && (
            <MdNotificationImportant className="mr-1 text-red-500" />
          )}
          <span>{title}</span>
        </div>
      </div>
      <div className="flex cursor-pointer items-center text-2xl text-red-300 hover:text-red-600">
        <MdRemoveCircleOutline onClick={() => onDelete(id)} />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
