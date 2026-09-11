import { Route, Routes } from "react-router-dom";
import RandomUser, { type User } from "./RandomUser";

const ExternalApiFetcher = () => {
  const onProfile = async (user: User) => {
    // cell, gender, username, password
    const data = `전화번호 : ${user.phone}
     성별 : ${user.gender}
     아이디 : ${user.login.username}
     비밀번호: ${user.login.password}`;
    alert(data);
  };

  return (
    <div>
      <h2 className="text-2xl flex justify-center py-5 text-violet-500 font-semibold">
        외부 서버 통신
      </h2>
      <Routes>
        <Route index element={<RandomUser onProfile={onProfile} />} />
      </Routes>
    </div>
  );
};

export default ExternalApiFetcher;
