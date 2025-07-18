// 해당 유저 정보가 불안정한지 확인하는 로직

import { useUserInfo } from "../store/userStore.ts";

export default function useUserValid(): boolean {
  const user = useUserInfo();

  const description = user?.description;
  const location = user?.location;
  const userStacks = user?.userStacks;
  const position = user?.positionId;

  // 필수 값이 모두 정의되어 있어야 하며
  if (description === undefined || location === undefined || userStacks === undefined || position === undefined) {
    return false;
  }

  // 세 값 중 하나라도 내용이 있으면 true
  const isValid =
    description.length > 0 ||
    location.length > 0 ||
    position.length > 0 ||
    userStacks.length > 0;

  return isValid;
}
