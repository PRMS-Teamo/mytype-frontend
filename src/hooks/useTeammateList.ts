import {useNavigate} from "react-router-dom";
import {useTeammateStore} from "../store/teammateStore.ts";
import useTeammate from "./useTeammate.ts";
import useRepostTeammate from "./useRepostTeammate.ts";

export default function useTeammateList() {
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
  return {
    handleRepost,
    teammates,
    handleClick
  }
}