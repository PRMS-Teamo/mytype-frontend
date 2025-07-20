import axios from "axios";
import { useUserInfo } from "../store/userStore.ts";
import { useEffect, useState } from "react";

const useTeamInfo = () => {
  const userInfo = useUserInfo();
  const [teamInfo, setTeamInfo] = useState<any>(null);
  const [teamMemberInfo, setTeamMemberInfo] = useState<Set<any>>(new Set());

  useEffect(() => {
    if (userInfo === null) {
      return;
    }
    if (!userInfo.isJoined) {
      return;
    }
    const getTeamInfo = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const teamInfoResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/teams/me`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const teamMemberInfoResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/teams/me/members`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          }
        )
        setTeamInfo(teamInfoResponse.data);
        const teamId = teamInfoResponse.data.teamId;
        const teamMemberData = teamMemberInfoResponse.data[teamId];
        console.log("#####TeamInfo#####")
        console.log(teamMemberData, teamInfoResponse)
        console.log("################")
        const teamSet = new Set();
        for (const member of teamMemberData) {
          for (const user of member.users) {
            teamSet.add(user);
          }
        }
        setTeamMemberInfo(teamSet); // 이 때 React가 상태 업데이트 감지
      } catch (error) {
        console.error(error);
      }
    };
    getTeamInfo();
    console.log(teamMemberInfo);
  }, []);
  return {
    teamInfo,
    teamMemberInfo,
  };
};

export default useTeamInfo;
