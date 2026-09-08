import FrontComp from "./FrontComp";
import BackComp from "./BackComp";
import FormComp from "./FormComp";

const MyComp = () => {
  return (
    <div>
      {/* 개별 컴포넌트 삽입 */}
      <h2>React - Component</h2>
      <ol>
        <FrontComp />
        <BackComp />
      </ol>
      {/* 컴포넌트 재활용 */}
      <ol>
        <BackComp />
      </ol>
      <FormComp />
    </div>
  );
};

export default MyComp;
