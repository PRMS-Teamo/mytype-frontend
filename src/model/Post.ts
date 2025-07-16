import type { Stack } from "../types/api";

export type PositionType =
  | "웹 프론트엔드"
  | "앱 프론트엔드"
  | "백엔드"
  | "디자이너"
  | "데이터 분석"
  | "풀스택"
  | "기획자"
  | "AI";

export type PositionDetail = {
  count: number;
  techStack: string[];
};
export interface Post {
  id:string;
  userId: string;
  nickname?: string;
  title: string;
  content: string;
  createdAt: string
  region: string;
  proceedMethod: string;
  deadline: string;
  positionCount: Partial<Record<PositionType, PositionDetail>>;
  techStacks: Stack[];
}