import Edit from "../assets/icons/Edit.svg?react";
import { useNavigate } from "react-router-dom";
import PostCardSlider from "../components/PostCard/PostCardSlider";
function Home() {
  const nav = useNavigate();

  const handleTeamPostClick = () => {
    nav("/post");
  };
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex items-center gap-2">
        <span className="text-[26px] font-semibold">팀원 구해요</span>
        <Edit onClick={handleTeamPostClick} />
      </div>
      <div>
        <PostCardSlider type="team" />
      </div>
      <span className="text-[26px] font-semibold">팀 구해요</span>
      <div>
      <PostCardSlider type="teammate" />
      </div>
    </div>
  );
}

export default Home;
