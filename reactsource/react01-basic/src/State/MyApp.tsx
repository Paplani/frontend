import { useState } from "react";
import MyButton from "./MyButton";

const MyApp = () => {
  const [count, setCount] = useState(0);
  const onClick = () => setCount(count + 1);

  const style1 = {
    padding: "16px",
    background: "red",
  };
  const style2 = {
    padding: "16px",
    background: "gray",
  };

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton style={style1} onClick={onClick} count={count} />
      <MyButton style={style2} onClick={onClick} count={count} />
    </div>
  );
};

export default MyApp;
