import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import type { TeamResponse } from "../../types/api";
import axios from "axios";
// import type { Post } from "../../model/Post";

export default function TeamList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<TeamResponse[]>([]);

  const handleClick = (id: string) => {
    navigate(`/findteam/${id}`);
  };

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`);
        console.log("GET RES", res);
        const data: TeamResponse[] = res.data;
        setPosts(data);
        console.log("GET TEAMS", data);
        return;
      } catch (e) {
        console.error(e);
      }
    }
    getTeamData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="w-[1140px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-8">
        {posts.map((post) => (
          <div
            key={post.teamId}
            onClick={() => handleClick(post.teamId)}
            className="cursor-pointer"
          >
            <PostCard type="team" post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}