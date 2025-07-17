import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import type { TeamResponse } from "../../types/api";
import axios from "axios";
import type { Post } from "../../model/Post"; 

export default function TeamList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]); 

  const handleClick = (id: string) => {
    navigate(`/findteam/${id}`);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`)
      .then((res) => {
        const data: TeamResponse[] = res.data;
        const mapped: Post[] = data.map((post) => ({
          id: post.teamId,
          title: post.title,
          content: post.content,
          location:post.location,
          createdAt: new Date().toISOString(), 
          userId: post.userId,
          nickname: "알 수 없음",
          postType: "team",
          region: "",
          proceedType: "BOTH",
          deadline: "",
          positionCount: {},
          techStacks: post.teamStacks.map((stack) => ({
            id: stack.stackId,
            name: stack.stackName,
            img: stack.imgUrl,
          })),
        }));
        setPosts(mapped);
      });
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="w-[1140px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-8">
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
    </div>
  );
}