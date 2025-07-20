export interface CommentItem {
  id: string;
  postId: number;       
  authorName: string;
  position: string;
  content: string;
}

export const commentMock: CommentItem[] = [
  {
    id: "1",
    postId: 1,
    authorName: "신혜민",
    position: "웹 프론트엔드",
    content: "열심히 참여하고 싶은 프론트엔드 개발자입니다!",
  },
  {
    id: "2",
    postId: 1,
    authorName: "김지수",
    position: "백엔드",
    content: "백엔드는 안 구함? 걍 뽑으셈",
  },
  {
    id: "1",
    postId: 2,
    authorName: "이정훈",
    position: "디자이너",
    content: "디자인으로 팀에 기여하고 싶습니다 :)",
  },
  {
    id: "1",
    postId: 3,
    authorName: "김희영",
    position: "디자이너",
    content: "저 진짜 피그마 고수임",
  },
  {
    id: "1",
    postId: 4,
    authorName: "이정훈",
    position: "디자이너",
    content: "디자인으로 팀에 기여하고 싶습니다 :)",
  },
  {
    id: "1",
    postId: 5,
    authorName: "이정훈",
    position: "디자이너",
    content: "디자인으로 팀에 기여하고 싶습니다 :)",
  },
];