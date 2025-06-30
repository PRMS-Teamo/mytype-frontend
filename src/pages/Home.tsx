import Edit from "../assets/icons/Edit.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Home() {
  const nav = useNavigate();
  const [teamPost, setTeamPost] = useState<boolean>(false);
  const [teammatePost, setTeammatePost] = useState<boolean>(false);
  const handleTeamPostClick = () => {
    nav("/post");
    setTeamPost(true);
  };
  const handleTeammatePostClick = () => {
    nav("/post");
    setTeammatePost(true);
  };
  
  return (
    <div>
      <div>
        팀원 구해요
        <Edit onClick={handleTeamPostClick} />
      </div>
      <div> 팀 구해요</div>
      <Edit onClick={handleTeammatePostClick} />
    // nav('/post');
    setTeamPost(true)
  }
    </div>
  );
}

export default Home;
