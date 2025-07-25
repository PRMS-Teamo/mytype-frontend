import { useUserStore } from "../../store/userStore";
import { getMatchingLabel } from "../../util/getMatchingLabel";
import PostCardLayout from "./PostCardLayout";
// import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";
import type { LabelType } from "./Label";
import type {TeamResponse} from "../../types/api.ts";
import {formatDate} from "../../util/formatDate.ts";

export interface TeamPostCardProps {
  type: "team";
  post: TeamResponse;
  onClick?: () => void;
}

export interface TeammatePostCardProps {
  type: "teammate";
  post: User;
  onClick?: () => void;
}

export type PostCardProps = TeamPostCardProps | TeammatePostCardProps;


export default function PostCard({ type, post, onClick }: PostCardProps) {
  const { user, isLoggedIn } = useUserStore();

  const labels: LabelType[] =
    type === "teammate"
      ? []
      : user && isLoggedIn
        ? getMatchingLabel({
            userPosition: user.positionId || "",
            userTechStack: user.userStacks|| [],
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
            ? formatDate(new Date(post.createdAt))
            : formatDate(new Date(post.updatedAt))
        }
        isOnline={type === "team" ? post.proceedType : user?.proceedType}
        content={type === "team" ? post.title : post.description|| ""}
        labels={labels}
        techStack={
          type === "team"
            ? post.positions
            : (post as User).userStacks || []
        }
        type={type}
      />
    </div>
  );
}