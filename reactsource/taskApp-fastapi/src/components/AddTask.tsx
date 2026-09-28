import { useState } from "react";

const AddTask = ({
  handleAddTask,
}: {
  handleAddTask: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  return (
    // <div className="flex gap-2">
    //   <input
    //     type="text"
    //     name="text"
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //     className="flex-1 rounded-md border px-3 py-2 ml-2 focus:right-2 focus:ring-orange-400 focus:outline-0"
    //     placeholder="여행 계획 입력"
    //   />
    //   <button
    //     type="button"
    //     className="rounded-md bg-orange-300 px-4 py-2 mr-2 text-white transition hover:bg-orange-600"
    //     onClick={() => {
    //       if (!text.trim()) return alert("여행계획을 입력해주세요");
    //       handleAddTask(text.trim());
    //       setText("");
    //     }}
    //   >
    //     Add
    //   </button>
    // </div>

    <form
      className="flex gap-2"
      action="/submit"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return alert("여행계획을 입력해주세요");
        handleAddTask(text.trim());
        setText("");
      }}
    >
      <input
        type="text"
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2 ml-2 focus:right-2 focus:ring-orange-400 focus:outline-0"
        placeholder="여행 계획 입력"
      />
      <button
        type="submit"
        className="rounded-md bg-orange-300 px-4 py-2 mr-2 text-white transition hover:bg-orange-600"
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
