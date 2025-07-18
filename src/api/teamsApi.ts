import { usePostStore } from "../store/postStore.ts";
import axios from "axios";
import type { Post } from "../model/Post.ts";

export const TeamsApi = () => {
  const { setMyPost } = usePostStore();

  const createTeam = async (post: Post) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/teams`, post, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMyPost(res.data);
    } catch (e) {
      console.error("팀 생성 실패", e);
    }
  };

  return { createTeam };
};