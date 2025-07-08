import type { ReactNode } from "react";

export type LabelType =
  | "포지션 일치"
  | "기술 일치"
  | "기술 부분 일치"
  | "해당 없음"
  | "로그인 후 일치 여부 확인가능";

interface LabelProps {
  type: LabelType;
  children: ReactNode;
}

export default function Label({ type, children }: LabelProps) {
  const baseStyle =
    "min-w-[75px] h-[26px] px-3 flex items-center justify-center rounded-full text-white text-xs";

  const bgColor =
    type === "포지션 일치"
      ? "bg-positionMatch"
      : type === "기술 일치" || type === "기술 부분 일치"
      ? "bg-skillMatch"
      : type === "해당 없음"
      ? "bg-noMatch"
      : type === "로그인 후 일치 여부 확인가능"
      ? "bg-needLogin"
      : "bg-gray-200";

  return <div className={`${baseStyle} ${bgColor}`}>{children}</div>;
}
