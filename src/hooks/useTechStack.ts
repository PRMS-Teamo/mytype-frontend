import { useEffect, useState } from "react";
import axios from "axios";
import type { TechStackType } from "../model/TeckStack.ts";

const useTechStack = () => {
  const [techStack, setTechStack] = useState<TechStackType[]>([]);
  const getTeckStack = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/stacks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const stackArray = res.data.stacks;
      const parsed = stackArray.map(
        (stc: { stackId: string; stackName: string; imgUrl: string }) => ({
          stackId: stc.stackId,
          stackName: stc.stackName,
          stackImg: stc.imgUrl,
        })
      );
      setTechStack(parsed);
    } catch (e) {
      console.error("포지션 목록 가져오기 실패", e);
    }
  };
  useEffect(() => {
    // 500ms 지연 후 API 호출
    const timer = setTimeout(() => {
      getTeckStack();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    techStack,
  };
};

export default useTechStack;
