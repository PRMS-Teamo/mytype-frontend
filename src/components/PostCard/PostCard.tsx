import { useUserStore } from "../../store/userStore";
import { getMatchingLabel } from "../../util/getMatchingLabel";
import PostCardLayout from "./PostCardLayout";
import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";
import type { LabelType } from "./Label";

interface TeamPostCardProps {
  type: "team";
  post: Post;
}

interface TeammatePostCardProps {
  type: "teammate";
  post: UserWithCardInfo; // 확장된 타입 사용
}

type PostCardProps = TeamPostCardProps | TeammatePostCardProps;

interface UserWithCardInfo extends User {
  updatedAt: string;
  introduction?: string;
  proceedMethod: string;
  techStack: string[];
}

export default function PostCard({ type, post }: PostCardProps) {
  const { user, isLoggedIn } = useUserStore();

  const labels: LabelType[] =
    user && isLoggedIn
      ? getMatchingLabel({
          userPosition: user.position || "",
          userTechStack: user.techStack || [],
          postPositions:
            type === "team"
              ? Object.keys(post.positionCount || {})
              : ([post.position || ""] as string[]),
          postTechStack: post.techStack || [],
          isLoggedIn,
        })
      : ["로그인 후 일치 여부 확인가능"];

  return (
    <PostCardLayout
      date={
        type === "team"
          ? new Date(post.createdAt).toISOString().slice(0, 10)
          : new Date(post.updatedAt).toISOString().slice(0, 10)
      }
      isOnline={type === "team" ? true : post.proceedMethod === "온라인"}
      content={type === "team" ? post.title : post.introduction || ""}
      labels={labels}
      techStack={post.techStack}
    />
  );
}
