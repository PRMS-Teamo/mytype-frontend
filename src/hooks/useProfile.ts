import axios from "axios";
import { useUserStore} from "../store/userStore.ts";

export default function useProfile() {
  const { user,setUser } = useUserStore();



  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("조회되었습니다.", res.data);
      setUser(res.data);
    } catch (e) {

      console.error("유저 조회 실패", e);
    }
  };

  const saveUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!user) {
        console.log("user 없음");
        return;
      }

      const payload = {
        nickname: user.nickname,
        github: user.github,
        location: user.location,
        positionId: user.positionId,
        proceedType: user.proceedType,
        beginner: user.beginner,
        userStacks: user.userStacks,
        description: user.description,
        isPublic: user.isPublic,
      };

      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/me`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("보낼 user 객체:", user);
      console.log("수정되었습니다", res.data);
      setUser(res.data);
    } catch (e) {
      console.log("보낼 user 객체:", user);
      console.log("유저 수정 실패", e);
    }
  }
  return {
    getUser,
    saveUser,
  };
}