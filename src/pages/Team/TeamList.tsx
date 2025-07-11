import { useNavigate } from "react-router-dom";
// import { postMock } from "../../mock/data/postMock";
 import PostCard from "../../components/PostCard/PostCard";
//
// export default function TeamList() {
//   const navigate = useNavigate();
//
//   const handleClick = (id: string) => {
//     navigate(`/findteam/${id}`);
//   };
//
//   const sortedPosts = [...postMock].sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );
//
//   return (
//     <div className="overflow-x-auto">
//       <div className="w-[1140px] grid grid-cols-3 gap-6 p-10 mt-8">
//         {sortedPosts.map((post) => (
//           <div
//             key={post.id}
//             onClick={() => handleClick(post.id)}
//             className="cursor-pointer"
//           >
//             <PostCard type="team" post={post} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import type { Post } from "../../model/Post";

const TeamList = () => {
   const nav = useNavigate();
   const [posts, setPosts] = useState<Post[]>([]);
  const handleClick = (id: string) => {
    nav(`/findteam/${id}`);
  };
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="">
      <div className="w-[1140px] grid grid-cols-3 gap-6 p-10 mt-8">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClick(post.id)}
            className="cursor-pointer"
          >
            <PostCard type="team" post={post} />
          </div>
        ))}
      </div>
      {/*{posts.map((post) => (*/}
      {/*  <Link to={`/findteammate/${post.id}`} key={post.id}>*/}
      {/*    <div>{post.title} - {post.nickname}</div>*/}
      {/*  </Link>*/}
      {/*))}*/}
    </div>
  );
};

export default TeamList;