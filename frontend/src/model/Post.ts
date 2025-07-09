export type PositionType =
  | "웹 프론트엔드"
  | "앱 프론트엔드"
  | "백엔드"
  | "디자이너"
  | "데이터 분석"
  | "풀스택"
  | "기획자"
  | "AI";

export type PostType =
  | "팀원 구해요"
  | "팀 구해요"

export type PositionDetail = {
  count: number;
  techStack: string[];
};

export interface CreatePost {
  filter:string;
  title: string;
  content: string;
  author: string;
  createdAt: string
  region: string;
  proceedMethod: string;
  deadline: string;
  positionCount: Partial<Record<PositionType, PositionDetail>>;
  techStack: string[];
}

export interface Post extends CreatePost {
  id: number;
}