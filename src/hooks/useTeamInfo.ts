import axios from "axios";
import { useUserInfo } from "../store/userStore.ts";
import { useEffect, useState } from "react";

const useTeamInfo = () => {
  const userInfo = useUserInfo();
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    // userInfo가 로딩되지 않았다면 아무 것도 안 함
    if (userInfo === null) {
      return null;
    }
    if (!userInfo.isJoined) {
      return;
    }
    const getTeamInfo = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/teams/me/${userInfo?.positionId}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTeamInfo(res.data);
        console.log("팀 정보를 가져오자", res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getTeamInfo();
  }, [userInfo]);

  return teamInfo;
};

export default useTeamInfo;
