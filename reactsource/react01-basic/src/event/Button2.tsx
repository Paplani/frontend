import { type ReactNode } from "react";

type ButtonType = {
  message: string;
  children: ReactNode;
};

// 자식
const AlertButton = ({ message, children }: ButtonType) => {
  return (
    <div>
      <button className="p4 bg-amber-400" onClick={() => alert(message)}>
        {children}
      </button>
    </div>
  );
};

// 부모
const Button2 = () => {
  return (
    <div>
      <AlertButton message={"Playing!"}>Play Movie</AlertButton>
      <AlertButton message={"Uploading!"}>Upload Image</AlertButton>
    </div>
  );
};

export default Button2;
