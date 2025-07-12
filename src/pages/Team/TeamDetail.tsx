// import { useParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
// import { postMock } from "../../mock/data/postMock";
import Comments from "../../components/Comments/Comments";
import WriteComment from "../../components/WriteComment/WriteComment";
 import Content from "../Post/Content";
 import ProjectType from "../Post/ProjectType";
//
// const TeamDetail = () => {
//   const { user } = useUserStore();
//   const { id } = useParams();
//
//   const post = postMock.find((p) => p.id === id);
//   if (!post) return <div className="p-12">게시글이 없습니다.</div>;
//   const isAuthor =
//     user?.nickname && post?.nickname&& user.nickname === post.nickname;
//
//   return (
//     <div className="border border-gray-300 rounded-lg mt-12">
//       <div className="m-12">
//         <Content post={post}/>
//         <ProjectType post={post} />
//         {isAuthor ? <Comments /> : <WriteComment />}
//       </div>
//     </div>
//   );
// };
//
// export default TeamDetail;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Post as PostType } from "../../model/Post";


const TeamDetail = () => {
  const { id } = useParams();
   const { user } = useUserStore();
  const [post, setPost] = useState<PostType | null>(null);
  const isAuthor = user?.userId && post?.userId&& user.userId === post.userId;

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/posts/${id}`).then((res) => {
      setPost(res.data);
    }).catch(() => {
      alert("게시글을 불러올 수 없습니다.");
    });
  }, [id]);

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