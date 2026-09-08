import { useState } from "react";
import seoul2 from "./../assets/img/seoul2.jpg";
import seoul3 from "./../assets/img/seoul3.jpg";

const Poster = () => {
  const [src, setSrc] = useState(seoul2);
  const [flag, setFlag] = useState(true);

    // 이미지를 기억할 필요 없이 단순히 2개를 번갈아 보여주기만 하면 됨
    // 만약 이미지가 3개 이상이라면 index개념으로 들어가서 숫자를 하나하나 늘려주는 코드를 작성해야함 => 현재 인덱스 번호 state에 저장 필요

  const onToggle = () => {
    if (flag) {
      setSrc(seoul3);
      setFlag(false);
    } else {
      setSrc(seoul2);
      setFlag(true);
    }
  };

  return (
    <div>
      <img src={src} alt="영화포스터" width={300} height={500} />
      <button onClick={onToggle}>이미지 변경</button>
    </div>
  );
};

export default Poster;
