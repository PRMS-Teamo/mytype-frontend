import type {TechStackType} from "../model/TeckStack.ts";

type LabelType =
  | "포지션 일치"
  | "기술 일치"
  | "기술 부분 일치"
  | "해당 없음"
  | "로그인 후 일치 여부 확인가능";

export interface MatchProps {
  userPosition: string;
  userTechStack:TechStackType[]; // stackId 배열
  postPositions: string[];
  postTechStack: TechStackType[]; // stackId 배열
  isLoggedIn: boolean;
}

export function getMatchingLabel({
  userPosition,
  userTechStack,
  postPositions,
  postTechStack,
  isLoggedIn,
}: MatchProps): LabelType[] {
  if (!isLoggedIn) return ["로그인 후 일치 여부 확인가능"];

  const labels: LabelType[] = [];
  const isPositionMatch = postPositions.includes(userPosition);

  if (isPositionMatch) {
    labels.push("포지션 일치");

    const matchCount = postTechStack.filter((techId) =>
      userTechStack.includes(techId)
    ).length;

    if (matchCount === postTechStack.length && matchCount > 0) {
      labels.push("기술 일치");
    } else if (matchCount > 0) {
      labels.push("기술 부분 일치");
    }
  } else {
    labels.push("해당 없음");
  }

  return labels;
}