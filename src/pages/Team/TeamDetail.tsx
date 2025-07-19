import Comments from "../../components/Comments/Comments";
import WriteComment from "../../components/WriteComment/WriteComment";
import Content from "../Post/Content";
import ProjectType from "../Post/ProjectType";
import useTeamDetail from "../../hooks/useTeamDetail.ts";


const TeamDetail = () => {
  const {
    post, user, isAuthor
  } = useTeamDetail();

  if (!post) return <div className="p-12">게시글이 없습니다.</div>;
  console.log("user데이터",user);
  console.log("post데이터",post);
  return (
    <div className="border border-gray-300 rounded-lg h-full">
      <div className="m-12">
        <Content post={post} />
        <ProjectType post={post} />
        {isAuthor ? <Comments /> : <WriteComment />}
      </div>
    </div>
  );
};

export default TeamDetail;