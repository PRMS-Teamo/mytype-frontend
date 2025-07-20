import { useEffect, useState } from "react";
import axios from "axios";
import type { TeamResponse } from "../types/api.ts";

export default function useTeamList() {
  const [posts, setPosts] = useState<TeamResponse[]>([]);

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`);
        const data: TeamResponse[] = res.data;
        console.log("팀정보", data);
        setPosts(data);
      } catch (e) {
        console.error(e);
      }
    };

    getTeamData();
  }, []);

  return posts;
}