import Content from "../Post/Content";
import ProjectType from "../Post/ProjectType";
import useTeam from "../../hooks/useTeamDetail";
import Comments from "../../components/Comments/Comments";
import WriteComment from "../../components/WriteComment/WriteComment";
import { useUserStore } from "../../store/userStore";

const TeamDetail = () => {
  const { team } = useTeam();
  const { user } = useUserStore();

  if (!team) {
    return <div className="p-12">팀 정보를 불러오는 중입니다...</div>;
  }

  const isAuthor = user?.id === team.userId;

  return (
    <div className="border border-gray-300 rounded-lg h-full">
      <div className="m-12">
        <Content post={team} />
        <ProjectType post={team} type="team" />
        <div className="pt-[200px]">{isAuthor ? <Comments /> : <WriteComment />}</div>
      </div>
    </div>
  );
};

export default TeamDetail;
