import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import useRepostTeam from "../../hooks/useRepostTeam.ts";
import { usePostStore } from "../../store/postStore.ts";
import { useUserStore } from "../../store/userStore.ts";
import useTeamList from "../../hooks/useTeamList.ts";

export default function TeamList() {
  const navigate = useNavigate();
  const { myPost } = usePostStore();
  const { repostTeam } = useRepostTeam();
  const { user } = useUserStore();
  const posts = useTeamList();

  const handleClick = (teamId: string) => {
    navigate(`/findteam/${teamId}`);
  };

  const handleRepost = () => {
    if (!myPost || !myPost.teamId) {
      alert("재게시할 팀 정보가 없습니다.");
      return;
    }

    if (myPost.userId !== user?.id) {
      alert("내가 작성한 팀이 아닙니다.");
      return;
    }

    repostTeam(myPost.teamId);
  };

  return (
    <div className="overflow-x-auto">
      <button
        onClick={handleRepost}
        className="w-[140px] h-[30px] border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors"
      >
        팀 재게시
      </button>
      <div className="w-[1140px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-8">
        {posts.map((post) => (
          <div
            key={post.teamId}
            onClick={() => handleClick(post.teamId)}
            className="cursor-pointer"
          >
            <PostCard type="team" post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}