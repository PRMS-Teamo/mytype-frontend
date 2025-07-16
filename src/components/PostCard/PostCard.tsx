import { useUserStore } from "../../store/userStore";
import { getMatchingLabel } from "../../util/getMatchingLabel";
import PostCardLayout from "./PostCardLayout";
import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";
import type { LabelType } from "./Label";

interface TeamPostCardProps {
  type: "team";
  post: Post;
  onClick?: () => void;
}

interface TeammatePostCardProps {
  type: "teammate";
  post: User;
  onClick?: () => void;
}

type PostCardProps = TeamPostCardProps | TeammatePostCardProps;


export default function PostCard({ type, post, onClick }: PostCardProps) {
  const { user, isLoggedIn } = useUserStore();

  const labels: LabelType[] =
    type === "teammate"
      ? []
      : user && isLoggedIn
        ? getMatchingLabel({
            userPosition: user.position || "",
            userTechStack: user.userStack|| [],
            postPositions: Object.keys(post.positionCount || {}),
            postTechStack: post.techStacks || [],
            isLoggedIn,
          })
        : ["로그인 후 일치 여부 확인가능"];

  return (
    <div onClick={onClick} className="cursor-pointer">
      <PostCardLayout
        date={
          type === "team"
            ? new Date(post.createdAt).toISOString().slice(0, 10)
            : new Date(post.updatedAt).toISOString().slice(0, 10)
        }
        isOnline={type === "team" ? true : post.proceedType === "온라인"}
        content={type === "team" ? post.title : post.description|| ""}
        labels={labels}
        techStack={
          type === "team"
            ? post.techStacks
            : (post as User).userStack || []
        }
      />
    </div>
  );
}