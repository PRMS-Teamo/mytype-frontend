import axios from "axios";
import { usePostStore } from "../store/postStore";
import type {Team} from "../model/Team";

export const TeamsApi = () => {
  const { setMyPost } = usePostStore();

  const createTeam = async (post: Team) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/teams`,
        post,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("팀 생성 성공", res.data);
      setMyPost(res.data);
    } catch (e) {
      console.error("팀 생성 실패", e);
    }
  };

  return { createTeam };
};