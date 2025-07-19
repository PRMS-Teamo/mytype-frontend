// import Comments from "../../components/Comments/Comments";
// import WriteComment from "../../components/WriteComment/WriteComment";
// import Content from "../Post/Content";
// import ProjectType from "../Post/ProjectType";
// import useTeamDetail from "../../hooks/useTeamDetail.ts";
// import type { TeamResponse } from "../../types/api";
//
// const TeamDetail = () => {
//   const {getTeamById} = useTeamDetail();
//
//   // if (!TeamResponse) return <div className="p-12">게시글이 없습니다.</div>;
//
//   return (
//     <div className="border border-gray-300 rounded-lg h-full">
//       <div className="m-12">
//         <Content post={post} />
//         <ProjectType post={post} />
//         {/*{isAuthor ? <Comments /> : <WriteComment />}*/}
//       </div>
//     </div>
//   );
// };
//
// export default TeamDetail;
import Content from "../Post/Content";
import ProjectType from "../Post/ProjectType";
import useTeam from "../../hooks/useTeamDetail";


const TeamDetail = () => {
  const { team } = useTeam();
  // const isAuthor=team?.userId!=user.userId
  if (!team) {
    return <div className="p-12">팀 정보를 불러오는 중입니다...</div>;
  }
console.log(team);
  return (
    <div className="border border-gray-300 rounded-lg h-full">
      <div className="m-12">
        <Content post={team} />
        <ProjectType post={team} type="team" />

         {/*{isAuthor ? <Comments /> : <WriteComment />}*/}
      </div>
    </div>
  );
};

export default TeamDetail;