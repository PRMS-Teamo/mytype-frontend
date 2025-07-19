import {type User, useUserInfo} from "../store/userStore.ts";
import useProfile from "./useProfile.ts";
import useTechStack from "./useTechStack.ts";
import usePosition from "./usePositions.ts";
import {useEffect} from "react";
import {useSetUserTemp, useUserTemp} from "../store/userTempStore.ts";

export default function useMyPage() {
  const { techStack } = useTechStack();
  const handleTechStackChange = (updatedIds: string[]) => {
    if (!user) return;
    const updatedTechStack = techStack.filter((stack) =>
      updatedIds.includes(stack.stackId)
    );

    setUser({
      ...user,
      userStacks: updatedTechStack, // ✅ TechStackType[]으로 변환한 후 저장
    });
  };
  const originalUser = useUserInfo();
  const user = useUserTemp();
  const setUser = useSetUserTemp();
  const {getUser}=useProfile()
  const {positions}=usePosition()
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  // 해당 페이지를 벗어나면, 원래 데이터로 변환
  useEffect(() => {
    if (originalUser !== user) {
      return () => {
        setUser(originalUser as User);
      }
    }
  }, [])

  const handlePositionChange = (name: string) => {
    if (!user) return;
    const selected = positions.find((p) => p.name === name);
    if (selected) {
      setUser({ ...user, positionId: selected.id });
    }
  };
  return {
    user, setUser, positions,
    handlePositionChange,
    handleTechStackChange,
  }
}