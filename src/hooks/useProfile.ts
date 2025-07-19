import axios from "axios";
import { useUserStore } from "../store/userStore.ts";
import useTeammate from "./useTeammate.ts";
import { useSetUserTemp, useUserTemp } from "../store/userTempStore.ts";
import { useState } from "react";

export default function useProfile() {
  const originalSetUser = useUserStore((state) => state.setUser);
  const user = useUserTemp();
  const setUser = useSetUserTemp();
  const { getTeammates } = useTeammate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
        userStacks: user.userStacks?.map((stack) => stack.stackId) ?? [],
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
      // 저장 후 응답
      console.log("payload값", payload);

      console.log("보낼 user 객체:", user);
      console.log("수정되었습니다", res.data);
      originalSetUser(res.data);
      setUser(res.data);
      await getTeammates();

      // 성공 토스트 표시
      setToastMessage("저장되었습니다!");
      setToastType("success");
      setShowToast(true);
    } catch (e) {
      console.log("보낼 user 객체:", user);
      console.log("유저 수정 실패", e);

      // 실패 토스트 표시
      setToastMessage("저장에 실패했습니다.");
      setToastType("error");
      setShowToast(true);
    }
  };
  return {
    getUser,
    saveUser,
    showToast,
    setShowToast,
    toastMessage,
    toastType,
  };
}
