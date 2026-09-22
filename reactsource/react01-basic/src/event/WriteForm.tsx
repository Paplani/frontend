import type { Dispatch, SetStateAction, SubmitEventHandler } from "react";

export type FormValues = {
  gubun: string;
  title: string;
};

type WriteFormProps = {
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  form: FormValues;
  setForm: Dispatch<SetStateAction<FormValues>>;
};

const WriteForm = ({ onSubmit, form, setForm }: WriteFormProps) => {
  return (
    <div className="border-2 py-4 border-gray-400 rounded-sm">
      <form action="" onSubmit={onSubmit}>
        <select
          name="gubun"
          className="mx-3"
          value={form.gubun}
          onChange={(e) => setForm({ ...form, gubun: e.target.value })}
        >
          <option value="">--------------</option>
          <option value="front">프론트엔드</option>
          <option value="back">백엔드</option>
        </select>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-1 border-gray-400 px-3"
        />
        <input
          type="submit"
          value="추가"
          className="border-2 border-gray-400 px-3"
        />
      </form>
    </div>
  );
};

export default WriteForm;
