import type { UserType } from "./LocalJsonFetcher";

const ContentBody = ({ myResult }: { myResult: UserType }) => {
  return (
    <div>
      <h2>{myResult.name}</h2>
      <ul>
        <li>num : {myResult.id}</li>
        <li>num : {myResult.name}</li>
        <li>num : {myResult.cell}</li>
        <li>num : {myResult.description}</li>
      </ul>
    </div>
  );
};

export default ContentBody;
