
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { TeamResponse } from "../types/api.ts";

const useTeam = () => {
  const [team, setTeam] = useState<TeamResponse | null>(null);
  const { teamId } = useParams<{ teamId: string }>();

  const getTeamById = async () => {
    if (!teamId) return;
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("내팀정보",res.data);

      setTeam(res.data);
    } catch (error) {
      console.error("팀 개별 조회 실패", error);
    }
  };

  useEffect(() => {
    getTeamById();
  }, [teamId]);

  return {
    team,
  };
};

export default useTeam;