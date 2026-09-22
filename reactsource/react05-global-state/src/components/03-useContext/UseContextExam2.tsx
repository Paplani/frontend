import Child1 from "./Child2";
import Child3 from "./Child3";
import CountProvider from "./CountProvider";
import OnProvider from "./OnProvider";

const UseContextExam2 = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-15 border rounded-2xl border-amber-500 py-5">
      <CountProvider>
        <h2 className="text-3xl">CountContext</h2>
        <Child1 />
      </CountProvider>

      <OnProvider>
        <div className="mt-7 border border-sky-500 rounded-2xl p-5 shadow-2xl bg-linear-to-r from-pink-100 via-purple-100 to-indigo-100">
        <h2 className="text-3xl">ToggleContext</h2>
        <Child3 />
        </div>
      </OnProvider>
    </div>
  );
};

export default UseContextExam2;
