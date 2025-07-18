import {useEffect, useState} from "react";
import axios from "axios";

export default function useTeamList() {
  const [teamList, setTeamList] = useState([]);
  useEffect(() => {
    const getTeamList = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/teams`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const teamListResponse = res.data;
        setTeamList(teamListResponse);
      } catch (error) {
        console.error("팀원 불러오기 실패", error);
      }
    }
    getTeamList();
  }, [])
  return teamList;
}