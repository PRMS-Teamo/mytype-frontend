import type { ReactNode } from "react";

type LabelType =
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
  let bgColor = "";

  switch (type) {
    case "포지션 일치":
      bgColor = "bg-[#5932EA]";
      break;
    case "기술 일치":
    case "기술 부분 일치":
      bgColor = "bg-[#DEBFEE]";
      break;
    case "해당 없음":
      bgColor = "bg-[#C3C3C3]";
      break;
    case "로그인 후 일치 여부 확인가능":
      bgColor = "bg-[#FF6464]";
      break;
    default:
      bgColor = "bg-gray-200";
  }

  return (
    <div
      className={`min-w-[75px] h-[26px] px-3 flex items-center justify-center rounded-full text-white text-xs ${bgColor}`}
    >
      {children}
    </div>
  );
}
