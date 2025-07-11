import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Post } from "../../model/Post";

const TeammateList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/findteammate/${post.id}`} key={post.id}>
          <div>{post.title} - {post.nickname}</div>
        </Link>
      ))}
    </div>
  );
};

export default TeammateList;