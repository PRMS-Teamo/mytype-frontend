import axios from "axios";
import { usePostStore } from "../store/postStore";
import {useUserStore} from "../store/userStore.ts";
import type {TeamResponse} from "../types/api.ts";

export const TeamsApi = () => {
  const { setMyPost } = usePostStore();
  const { user } = useUserStore();
  const isJoined = user?.isJoined;
  const createTeam = async (post: TeamResponse) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (isJoined) {
        const res = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/teams/me`,
          post,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMyPost(res.data);
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/teams`,
          post,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMyPost(res.data);
      }
    } catch (e) {
      console.error("팀 생성/수정 실패", e);
    }
  };

  return { createTeam };
};