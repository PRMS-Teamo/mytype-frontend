// import type { Stack } from "../types/api";
import type {TechStackType} from "./TeckStack.ts";

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
  techStacks:TechStackType[];
};
export interface Post {
  id:string;
  userId: string;
  location:string;
  nickname?: string;
  title: string;
  content: string;
  createdAt: string
  region: string;
  proceedType: string;
  deadline: string;
  positionCount: Partial<Record<PositionType, PositionDetail>>;
  techStacks: TechStackType[];
}