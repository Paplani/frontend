import { useState } from "react";
import ContentBody from "./ContentBody";
import GlobalTop from "./GlobalTop";

export type UserType = {
  num: number;
  id: string;
  name: string;
  cell: string;
  description?: string;
};

const LocalJsonFetcher = () => {
  const [myResult, setMyResult] = useState<UserType | null>(null);

  const myLinkClick = async (num: number) => {
    // user1, user2
    const response = await fetch(`./data/user${num}.json`);
    const data = await response.json();
    setMyResult(data);
  };

  return (
    <div>
      <h2 className="text-2xl flex justify-center pt-4 font-semibold">
        내부 서버 통신
      </h2>
      <GlobalTop myLinkClick={myLinkClick} />
      {myResult && <ContentBody myResult={myResult} />}
    </div>
  );
};

export default LocalJsonFetcher;
