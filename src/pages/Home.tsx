import Edit from "../assets/icons/Edit.svg?react";
import { useNavigate } from "react-router-dom";
function Home() {
  const nav = useNavigate();


  const handleTeamPostClick = () => {
    nav("/post");
  };
  return (
    <div>
      <div>
        팀원 구해요
        <Edit onClick={handleTeamPostClick} />
      </div>
    </div>
  );
}

export default Home;