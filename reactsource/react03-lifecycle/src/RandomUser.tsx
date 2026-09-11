import { useEffect, useState } from "react";

export type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

type UserResponse = {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};

const RandomUser = ({ onProfile }: { onProfile: (user: User) => void }) => {
  const [result, setResult] = useState<User[]>([]);

  const getData = async () => {
    // user1, user2
    const response = await fetch(`https://api.randomuser.me?results=10`);
    const data: UserResponse = await response.json();
    return data.results;
  };

  // myData.json 가져오기
  useEffect(() => {
    console.log("3. useEffect 실행");

    const fetchData = async () => {
      // getData가 비동기적이라 await 해줘야함
      const localData = await getData(); // 렌더링 후 myData.json 가지고 오기
      setResult(localData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="mx-auto border-collapse [&_th]:border [&_th]:border-rose-400 [&_th]:p-3 [&_td]:border [&_td]:border-stone-500 [&_td]:p-3 [&_td:nth-child(4)]:font-bold [&_td:nth-child(3)]:text-green-400">
        <thead>
          <tr>
            <th>사진</th>
            <th>로그인</th>
            <th>이름</th>
            <th>국가</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {result.map((user) => (
            <tr key={user.login.uuid}>
              <td>
                {/* picture */}
                <img src={user.picture.thumbnail} alt="image" />
              </td>
              <td>
                {/* username */}
                <a
                  href="/"
                  target="_blank" // 새 탭에서 열기
                  rel="noreferrer" // 이동할 사이트에 "어느 페이지에서 넘어왔는지" 정보 안 보냄
                  className="text-blue-600 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    // 부모가 넘겨준 onProfile() 호출
                    onProfile(user); // 자식이 정보를 부모에게 넘기는 방법
                  }}
                >
                  {user.login.username}
                </a>
              </td>
              <td>
                {/* name 3개 다 */}
                {user.name.title}.{user.name.first} {user.name.last}
              </td>
              <td>
                {/* nat */}
                {user.nat}
              </td>
              <td>
                {/* email */}
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RandomUser;
