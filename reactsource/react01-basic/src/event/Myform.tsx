import { useState, type SubmitEventHandler } from "react";
import WriteForm, { type FormValues } from "./WriteForm";

const Myform = () => {
  const [form, setForm] = useState<FormValues>({
    gubun: "",
    title: "",
  });

  // 부모가 자식의 폼 submit 처리
  //   const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
  //     e.preventDefault();

  //     //form의 모든 데이터 가져오기
  //     const formData = new FormData(e.currentTarget);

  //     const gubun = formData.get("gubun");
  //     const title = formData.get("title");

  //     // gubun, title 값 확인
  //     if (gubun && title) {
  //       console.log("gubun: ", gubun);
  //       console.log("title: ", title);
  //     } else {
  //       alert("모든 값을 채워주세요");
  //     }

  //   };

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { gubun, title } = form;
    if (gubun && title) {
      console.log("gubun: ", gubun);
      console.log("title: ", title);
    } else {
      alert("모든 값을 채워주세요");
    }
  };

  return (
    <div>
      <WriteForm onSubmit={onSubmit} form={form} setForm={setForm} />
    </div>
  );
};

export default Myform;
