import { useEffect, useState } from "react";
import type { UserType } from "./LocalJsonFetcher";

const GlobalTop = ({ myLinkClick }: { myLinkClick: (num: number) => void }) => {
  console.log("1.컴포넌트 실행");

  const [myList, setMyList] = useState<UserType[]>([]);

  const getData = async () => {
    // user1, user2
    const response = await fetch(`./data/myData.json`);
    const data = await response.json();
    return data;
  };

  // myData.json 가져오기
  useEffect(() => {
    console.log("3. useEffect 실행");

    const fetchData = async () => {
      // getData가 비동기적이라 await 해줘야함
      const localData = await getData(); // 렌더링 후 myData.json 가지고 오기
      setMyList(localData);
    };

    fetchData();
  }, []);

  console.log("2. return 실행 (rendering)");

  return (
    <div className="w-full">
      <ul className="flex justify-center items-center flex-col">
        {myList.map((list) => (
          <li key={list.id}>
            {/* 이름 클릭시 해당 user 상세정보 가져오기 */}
            {/* 하이퍼링크 클릭하면 새로고침 막아야함 */}
            <a
              href={list.id}
              data-id={list.num}
              onClick={(e) => {
                e.preventDefault();
                // data- 로 시작되는 값을 이용시 무조건 .dataset 을 넣어줘야함
                myLinkClick(parseInt(e.currentTarget.dataset.id as string));
              }}
            >
              {list.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalTop;
