import type { Post } from "../../model/Post";

export const postMock: Post[] = [
  {
    id: "1",
    userId: "1",
    nickname: "홍길동",
    filter: "팀원 구해요",
    title: "진짜 열정 넘치는 frontend 구합니다",
    content: "프로젝트는 거의 완성됐고, 유지보수와 리팩토링을 같이 해주실 분을 찾고 있어요!",
    createdAt: "2025-06-25",
    region: "서울",
    proceedMethod: "온라인",
    deadline: "2025-07-15",
    techStack: ["React", "TypeScript", "TailwindCSS"],
    positionCount: {
      "웹 프론트엔드": {
        count: 1,
        techStack: ["React", "TypeScript"],
      },
      "백엔드": {
        count: 2,
        techStack: ["Spring"],
      },
    },
  },
  {
    id: "2",
    userId: "2",
    nickname: "이수현",
    filter: "팀원 구해요",
    title: "디자인 시스템 구축에 관심 있는 프론트 구해요",
    content: "Figma에 익숙하고, Storybook 써본 분이면 더 좋습니다!",
    createdAt: "2025-07-25",
    region: "서울",
    proceedMethod: "오프라인",
    deadline: "2025-07-20",
    techStack: ["React", "Storybook", "SCSS"],
    positionCount: {
      "웹 프론트엔드": {
        count: 1,
        techStack: ["React"],
      },
      "디자이너": {
        count: 1,
        techStack: ["Figma"],
      },
    },
  },
  {
    id: "3",
    userId: "3",
    nickname: "박지민",
    filter: "팀원 구해요",
    title: "장기적으로 함께할 앱 프론트 분 구합니다",
    content: "지속적인 유지보수와 기능 추가를 계획 중이에요.",
    createdAt:"2025-07-25",
    region: "부산",
    proceedMethod: "온라인",
    deadline: "2025-07-22",
    techStack: ["Vue", "TypeScript"],
    positionCount: {
      "앱 프론트엔드": {
        count: 1,
        techStack: ["Flutter", "React Native"],
      },
      "백엔드": {
        count: 2,
        techStack: ["Node.js"],
      },
    },
  },
  {
    id: "4",
    userId: "1",
    nickname: "홍길동",
    filter: "팀원 구해요",
    title: "웹소켓 기반 채팅 서비스에 관심 있는 분?",
    content: "실시간 서비스에 관심 있으면 부담 없이 지원해주세요!",
    createdAt:"2025-07-25",
    region: "대전",
    proceedMethod: "온/오프라인 병행",
    deadline: "2025-07-18",
    techStack: ["Next.js", "Socket.IO", "Zustand"],
    positionCount: {
      "웹 프론트엔드": {
        count: 1,
        techStack: ["Next.js"],
      },
      "백엔드": {
        count: 1,
        techStack: ["Nest.js"],
      },
      "기획자": {
        count: 1,
        techStack: [],
      },
    },
  },
  {
    id: "5",
    userId: "4",
    nickname: "최윤아",
    filter: "팀원 구해요",
    title: "백엔드 해주실분??",
    content: "실시간 서비스에 관심 있으면 부담 없이 지원해주세요!",
    createdAt:"2025-07-25",
    region: "서울",
    proceedMethod: "온라인",
    deadline: "2025-07-25",
    techStack: ["Nest.js", "Python"],
    positionCount: {
      "백엔드": {
        count: 3,
        techStack: ["Nest.js", "Python"],
      },
      "기획자": {
        count: 1,
        techStack: [],
      },
    },
  },
];