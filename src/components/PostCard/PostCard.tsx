import { useUserStore } from "../../store/userStore";
import { getMatchingLabel } from "../../util/getMatchingLabel";
import PostCardLayout from "./PostCardLayout";
import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";

interface TeamPostCardProps {
  type: "team";
  post: Post;
}

interface TeammatePostCardProps {
  type: "teammate";
  post: User;
}

type PostCardProps = TeamPostCardProps | TeammatePostCardProps;

export default function PostCard({ type, post }: PostCardProps) {
  const { user, isLoggedIn } = useUserStore();

  const labels =
    type === "team" && user
      ? getMatchingLabel({
          userPosition: user.position || "",
          userTechStack: user.techStack || [],
          postPositions: Object.keys(post.positionCount || {}),
          postTechStack: post.techStack,
          isLoggedIn,
        })
      : !user
      ? ["로그인 후 일치 여부 확인가능"]
      : [];

  return (
    <PostCardLayout
      date={
        type === "team"
          ? new Date(post.createdAt).toISOString().slice(0, 10)
          : new Date(post.updatedAt!).toISOString().slice(0, 10)
      }
      isOnline={
        type === "team"
          ? true
          : post.proceedMethod === "온라인"
      }
      content={
        type === "team"
          ? post.title
          : post.introduction || ""
      }
      labels={labels}
      techStack={post.techStack}
    />
  );
}
