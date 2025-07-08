export type PositionType =
  | "웹 프론트엔드"
  | "앱 프론트엔드"
  | "백엔드"
  | "디자이너"
  | "데이터 분석"
  | "풀스택"
  | "기획자"
  | "AI";

export interface Post {
  filter: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  profileImage: string[];
  techStack: string[];
  positionCount: {
    [key in PositionType]?: number;
  };
}
