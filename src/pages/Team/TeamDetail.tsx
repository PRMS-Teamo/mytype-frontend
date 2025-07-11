import { useParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { postMock } from "../../mock/data/postMock";
import Comments from "../../components/Comments/Comments";
import WriteComment from "../../components/WriteComment/WriteComment";
import Content from "../Post/Content";
import ProjectType from "../Post/ProjectType";

const TeamDetail = () => {
  const { user } = useUserStore();
  const { id } = useParams();

  const post = postMock.find((p) => p.id === Number(id));

  const isAuthor =
    user?.nickname && post?.author && user.nickname === post.author;

  return (
    <div className="border border-gray-300 rounded-lg mt-12">
      <div className="m-12">
        <Content />
        <ProjectType />
        {isAuthor ? <Comments /> : <WriteComment />}
      </div>
    </div>
  );
};

export default TeamDetail;