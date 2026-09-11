import { useParams } from "react-router-dom";

const Profile = () => {
  // id 값을 가지고 오고 싶다면?
  const { id } = useParams();

  return (
    <div>
      <h2>Profile : {id}</h2>
    </div>
  );
};

export default Profile;
