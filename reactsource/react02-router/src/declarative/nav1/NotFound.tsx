import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다.<Link to="/">홈으로 이동</Link>
      </p>
    </div>
  );
};

export default NotFound;
