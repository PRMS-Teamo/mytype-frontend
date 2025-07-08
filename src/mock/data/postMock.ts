import type { Post } from "../../model/Post";

export const postMock: Post[] = [
  {
    filter: "팀원 구해요",
    title: "진짜 열정 넘치는 프론트 구합니다",
    content:
      "프로젝트는 거의 완성됐고, 유지보수와 리팩토링을 같이 해주실 분을 찾고 있어요!",
    author: "신혜민",
    createdAt: "2025-07-01T10:30:00Z",
    profileImage: ["/avatars/user1.png", "/avatars/user2.png"],
    techStack: ["React", "TypeScript", "TailwindCSS"],
    positionCount: {
      '웹 프론트엔드': 1,
      '백엔드': 2,
    },
  },
  {
    filter: "팀원 구해요",
    title: "디자인 시스템 구축에 관심 있는 프론트 구해요",
    content: "Figma에 익숙하고, Storybook 써본 분이면 더 좋습니다!",
    author: "이수현",
    createdAt: "2025-07-02T12:00:00Z",
    profileImage: ["/avatars/user4.png"],
    techStack: ["React", "Storybook", "SCSS"],
    positionCount: {
      '웹 프론트엔드': 2,
      '디자이너': 1,
    },
  },
  {
    filter: "팀원 구해요",
    title: "장기적으로 함께할 앱 프론트 분 구합니다",
    content: "지속적인 유지보수와 기능 추가를 계획 중이에요.",
    author: "박지민",
    createdAt: "2025-07-02T17:30:00Z",
    profileImage: ["/avatars/user5.png"],
    techStack: ["Vue", "TypeScript"],
    positionCount: {
      '앱 프론트엔드': 1,
      '백엔드': 2,
    },
  },
  {
    filter: "팀원 구해요",
    title: "웹소켓 기반 채팅 서비스에 관심 있는 분?",
    content: "실시간 서비스에 관심 있으면 부담 없이 지원해주세요!",
    author: "최윤아",
    createdAt: "2025-07-03T09:15:00Z",
    profileImage: ["/avatars/user6.png"],
    techStack: ["Next.js", "Socket.IO", "Zustand"],
    positionCount: {
      '웹 프론트엔드': 1,
      '백엔드': 1,
      '기획자': 1,
    },
  },
  {
    filter: "팀원 구해요",
    title: "백엔드 해주실분??",
    content: "실시간 서비스에 관심 있으면 부담 없이 지원해주세요!",
    author: "최윤아",
    createdAt: "2025-07-03T09:15:00Z",
    profileImage: ["/avatars/user6.png"],
    techStack: ["Nest.js", "Python"],
    positionCount: {
      '백엔드': 3,
      '기획자': 1,
    },
  },
];
