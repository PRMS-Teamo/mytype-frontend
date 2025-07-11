import { useParams } from "react-router-dom";
import { postMock } from "../../mock/data/postMock";
import { formatDate } from "../../util/formatDate";

const Post = () => {
  const { id } = useParams();
  const post = postMock.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="text-center text-gray-500">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div>
      <div className="text-main text-[0.9375rem] ">
        {formatDate(new Date(post.createdAt))}
      </div>
      <div className="text-2xl font-bold text-black mt-4">{post.title}</div>
      <div className="text-[0.9375rem] text-gray mt-7">{post.content}</div>
    </div>
  );
};

export default Post;
