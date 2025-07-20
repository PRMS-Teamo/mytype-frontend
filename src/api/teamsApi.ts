import axios from "axios";
import { usePostStore } from "../store/postStore";
import {useUserStore} from "../store/userStore.ts";
import type {PostPayload} from "../model/Post.ts";
import {useNavigate} from "react-router-dom";

export const TeamsApi = () => {
  const { setMyPost } = usePostStore();
  const { user } = useUserStore();
  const updateJoin = useUserStore((state) => state.updateJoin);
  const isJoined = user?.isJoined;
  const nav = useNavigate();
  const createTeam = async (post: PostPayload) => {
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
        updateJoin(true);
        setMyPost(res.data);
        nav('/home', {replace: true});
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
        updateJoin(true);
        nav('/home', {replace: true});
      }
    } catch (e) {
      console.error("팀 생성/수정 실패", e);
    }
  };

  return { createTeam };
};