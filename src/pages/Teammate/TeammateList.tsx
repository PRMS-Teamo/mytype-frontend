import useTeammate from "../../hooks/useTeammate";
import { useTeammateStore } from "../../store/teammateStore.ts";
import PostCard from "../../components/PostCard/PostCard.tsx";
import { useNavigate } from "react-router-dom";
import useRepostTeammate from "../../hooks/useRepostTeammate";

const TeammateList = () => {
  const nav = useNavigate();
  const { teammates } = useTeammateStore();
  useTeammate();

  const { repostTeammate } = useRepostTeammate();

  const handleClick = (id: string) => {
    nav(`/findteammate/${id}`);
  };

  const handleRepost = () => {
    if (teammates.length === 0) {
      alert("재게시할 프로필이 없습니다.");
      return;
    }

    const postId = teammates[0].id;
    repostTeammate(postId);
  };

  return (
    <>
      <div className="w-[1140px] flex justify-end mt-10">
        <button
          onClick={handleRepost}
          className="w-[140px] h-[30px] border border-main text-main rounded-full hover:bg-main hover:text-white transition-colors"
        >
          프로필 재게시
        </button>
      </div>

      <div className="w-[1140px] grid grid-cols-3 gap-6 p-10 mt-8">
        {teammates.map((user) => {
          const userWithCardInfo = {
            ...user,
            proceedMethod: user.proceedType,
            techStack: user.userStacks || [],
            introduction: user.description || "",
            updatedAt: user.updatedAt,
          };

          return (
            <div key={user.id} onClick={() => handleClick(user.id)}>
              <PostCard type="teammate" post={userWithCardInfo} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeammateList;