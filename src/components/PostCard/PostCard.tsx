import { useUserStore } from "../../store/userStore";
import { getMatchingLabel } from "../../util/getMatchingLabel";
import PostCardLayout from "./PostCardLayout";
import type { Post } from "../../model/Post";
import type { LabelType } from "./Label";
import type { Stack } from "../../types/api";
interface UserWithStack {
  id: string;
  nickname: string;
  position: string;
  techStacks: Stack[]; 
}

interface TeamPostCardProps {
  type: "team";
  post: Post;
  onClick?: () => void;
}

interface TeammatePostCardProps {
  type: "teammate";
  post: UserWithCardInfo;
  onClick?: () => void;
}

type PostCardProps = TeamPostCardProps | TeammatePostCardProps;

interface UserWithCardInfo extends UserWithStack {
  updatedAt: string;
  introduction?: string;
  proceedMethod: string;
}

export default function PostCard({ type, post, onClick }: PostCardProps) {
  const { user, isLoggedIn } = useUserStore();

  const labels: LabelType[] =
  type === "teammate"
    ? []
    : user && isLoggedIn
      ? getMatchingLabel({
          userPosition: user.position || "",
          userTechStack: (user.techStacks ?? []).map((s: Stack) => s.stackId),
          postPositions: Object.keys(post.positionCount || {}),
          postTechStack: (post.techStacks ?? []).map((s: Stack) => s.stackId),
          isLoggedIn,
        })
      : ["로그인 후 일치 여부 확인가능"];

const techStackImages = (post.techStacks ?? []).map((s: Stack) => s.imgUrl);

  return (
    <div onClick={onClick} className="cursor-pointer">
      <PostCardLayout
        date={
          type === "team"
            ? new Date(post.createdAt).toISOString().slice(0, 10)
            : new Date(post.updatedAt).toISOString().slice(0, 10)
        }
        isOnline={type === "team" ? true : post.proceedMethod === "온라인"}
        content={type === "team" ? post.title : post.introduction || ""}
        labels={labels}
        techStack={techStackImages}
      />
    </div>
  );
}