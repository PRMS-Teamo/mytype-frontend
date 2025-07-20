import Content from "../Post/Content";
import ProjectType from "../Post/ProjectType";
import useTeam from "../../hooks/useTeamDetail";
import Comments, { type CommentData } from "../../components/Comments/Comments";
import WriteComment from "../../components/WriteComment/WriteComment";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import axios from "axios";
import type { TeamResponse } from "../../types/api.ts";

const TeamDetail = () => {
  const { team } = useTeam();
  const { user } = useUserStore();
  const [applyList, setApplyList] = useState<CommentData[]>([]);

  const fetchApplyList = async (team: TeamResponse) => {
    if (!team) return;

    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get<CommentData[]>(
        `${import.meta.env.VITE_BACKEND_URL}/applies/teams/${team.teamId}/history`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setApplyList(res.data);
      console.log("applyList", applyList);
      console.log("댓글 데이터(commentData):", res.data);
    } catch (err) {
      console.log("teamId:", team.teamId);
      console.log("applyList", applyList);
      console.error("지원 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (team) {
      fetchApplyList(team);
    }
  }, [team]);

  if (!team) {
    return <div className="p-12">팀 정보를 불러오는 중입니다...</div>;
  }

  const isAuthor = user?.id === team.userId;

  return (
    <div className="border border-gray-300 rounded-lg h-full">
      <div className="m-12">
        <Content post={team} />
        <ProjectType post={team} type="team" />
        <div className="pt-[200px]">
          {isAuthor ? (
            <Comments
              comments={applyList}
              currentUserId={user.id}
              teamOwnerId={team.userId}
              onAccept={(c) => console.log("Accept", c)}
              onReject={(c) => console.log("Reject", c)}
              onDelete={(c) => console.log("Delete", c)}
            />
          ) : (
            <>
              <Comments
                comments={applyList}
                currentUserId={user?.id}

              />
            <WriteComment onSuccess={() => fetchApplyList(team)} />

            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeamDetail;