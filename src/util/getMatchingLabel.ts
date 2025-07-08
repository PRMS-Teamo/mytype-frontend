export interface MatchProps {
  userPosition: string;
  userTechStack: string[];
  postPositions: string[];
  postTechStack: string[];
  isLoggedIn: boolean;
}

export function getMatchingLabel({
  userPosition,
  userTechStack,
  postPositions,
  postTechStack,
  isLoggedIn,
}: MatchProps): string[] {
  if (!isLoggedIn) return ["로그인 후 일치 여부 확인가능"];

  const labels: string[] = [];
  const isPositionMatch = postPositions.includes(userPosition);

  if (isPositionMatch) {
    labels.push("포지션 일치");

    const matchCount = postTechStack.filter((tech) =>
      userTechStack.includes(tech)
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
