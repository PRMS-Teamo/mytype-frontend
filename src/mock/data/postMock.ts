import type { Post } from "../../model/Post";

export const postMock: Post[] = [
  {
    filter: "팀원 구해요",
    title: "진짜 열정 넘치는 프론트 구합니다",
    content:
      "프로젝트는 거의 완성됐고, 유지보수와 리팩토링을 같이 해주실 분을 찾고 있어요!",
    author: "신혜민",
    createdAt: "2025-07-01T10:30:00Z",
    frontend_count: 1,
    backendCount: 2,
    profileImage: ["/avatars/user1.png", "/avatars/user2.png"],
    techStack: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    filter: "팀원 구해요",
    title: "디자인 시스템 구축에 관심 있는 프론트 구해요",
    content: "Figma에 익숙하고, Storybook 써본 분이면 더 좋습니다!",
    author: "이수현",
    createdAt: "2025-07-02T12:00:00Z",
    frontend_count: 2,
    backendCount: 1,
    profileImage: ["/avatars/user4.png"],
    techStack: ["React", "Storybook", "SCSS"],
  },
  {
    filter: "팀원 구해요",
    title: "장기적으로 함께할 프론트 분 구합니다",
    content: "지속적인 유지보수와 기능 추가를 계획 중이에요.",
    author: "박지민",
    createdAt: "2025-07-02T17:30:00Z",
    frontend_count: 1,
    backendCount: 2,
    profileImage: ["/avatars/user5.png"],
    techStack: ["Vue", "TypeScript"],
  },
  {
    filter: "팀원 구해요",
    title: "웹소켓 기반 채팅 서비스에 관심 있는 분?",
    content: "실시간 서비스에 관심 있으면 부담 없이 지원해주세요!",
    author: "최윤아",
    createdAt: "2025-07-03T09:15:00Z",
    frontend_count: 2,
    backendCount: 2,
    profileImage: ["/avatars/user6.png"],
    techStack: ["Next.js", "Socket.IO", "Zustand"],
  },
];
