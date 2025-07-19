import {useUserStore} from "../store/userStore.ts";
import useProfile from "./useProfile.ts";
import useTechStack from "./useTechStack.ts";
import usePosition from "./usePositions.ts";
import {useEffect} from "react";

export default function useMyPage() {
  const { user, setUser } = useUserStore();
  const {getUser}=useProfile()
  const { techStack } = useTechStack();
  const {positions}=usePosition()
  useEffect(() => {
    if (!user)
      getUser();
  }, []);

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
  const handlePositionChange = (name: string) => {
    if (!user) return;
    const selected = positions.find((p) => p.name === name);
    if (selected) {
      setUser({ ...user, positionId: selected.id });
    }
  };
  return {
    user, setUser, positions, handlePositionChange, handleTechStackChange
  }
}