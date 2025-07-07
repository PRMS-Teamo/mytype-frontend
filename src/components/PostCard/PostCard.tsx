import PostCardLayout from "./PostCardLayout";
import type { Post } from "../../model/Post";
import { userMock } from "../../mock/data/userMock"; 

interface TeamPostCardProps {
  type: "team";
  post: Post;
}

interface TeammatePostCardProps {
  type: "teammate";
  post: typeof userMock.existUser;
}

type PostCardProps = TeamPostCardProps | TeammatePostCardProps;

export default function PostCard({ type, post }: PostCardProps) {
  if (type === "team") {
    return (
      <PostCardLayout
        date={new Date(post.createdAt).toISOString().slice(0, 10)}
        isOnline={true}
        content={post.title}
        label="포지션 일치"
        techStack={post.techStack}
      />
    );
  }

  return (
    <PostCardLayout
      date={new Date(post.updatedAt).toISOString().slice(0, 10)}
      isOnline={post.proceedMethod === "온라인"}
      content={post.bio}
      label=""
      techStack={post.techStack}
    />
  );
}
