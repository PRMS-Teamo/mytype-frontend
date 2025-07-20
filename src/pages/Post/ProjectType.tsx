import { POST_TEAM, POST_TEAMMATE } from "../../constants/post/post";
import { PROCEED_TYPE } from "../../constants/proceedType/proceedType";
import type { PostCardProps } from "../../components/PostCard/PostCard";
import { BEGINNER } from "../../constants/beginner/beginner";
import {formatDate} from "../../util/formatDate.ts";

const ProjectType = ({ post, type }: PostCardProps) => {
  if (!post) return null;
  const isTeamPost = type === "team";
  const postInfo = isTeamPost ? POST_TEAM : POST_TEAMMATE;
  const getProceedTypeLabel = (value: string | undefined) => {
    return (
      PROCEED_TYPE.find((item) => item.id === value)?.label || "진행방식 미지정"
    );
  };

  return (
    <div className="flex mt-12 gap-12 rounded-lg">
      <div className="gap-3 flex flex-col text-main font-bold min-w-[100px]">
        {Object.entries(postInfo).map(([_, value]) => (
          <div key={value}>{value}</div>
        ))}
      </div>

      <div className="text-black gap-3 flex flex-col">
        {isTeamPost ? (
          <>
            <div>{getProceedTypeLabel(post.proceedType)}</div>
            <div className="flex gap-2 flex-wrap">
              {post.positions && post.positions.length > 0 ? (
                post.positions.map((position, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {position.positionStacks.map((stack) => (
                      <img
                        key={stack.stackId}
                        src={stack.imgUrl}
                        alt={stack.stackName}
                        className="w-6 h-6"
                      />
                    ))}
                  </div>
                ))
              ) : (
                <div>스택 정보 없음</div>
              )}
            </div>
            <div>{"location" in post ? post.location : "?"}</div>
            <div className="flex gap-4 flex-wrap">
              {post.positions
                ?.filter((position) => position.positionName !== "팀 생성자")
                .map((position) => (
                  <div key={position.positionId}>
                    <div>
                      {position.positionName} ({position.count})
                    </div>
                    <div className="ml-4">
                      {position.positionStacks.map((stack) => (
                        <div key={stack.stackId}>- {stack.stackName}</div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
            <div>{"endTime" in post ? formatDate(new Date(post.endTime)) : "마감기한 안뜸"}</div>
          </>
        ) : (
          <>
            <div>{getProceedTypeLabel(post.proceedType)}</div>

            <div className="flex gap-3 flex-wrap items-center">
              {"userStacks" in post && post.userStacks?.length ? (
                post.userStacks.map((stack, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {stack.stackName}
                  </div>
                ))
              ) : (
                <span className="text-gray-400">기술 스택 없음</span>
              )}
            </div>

            <div>{("location" in post && post.location) || "지역 미지정"}</div>
            <div>{("github" in post && post.github) || "깃허브 없음"}</div>
            <div>
              {typeof post.beginner === "boolean"
                ? BEGINNER.find((item) => item.id === post.beginner)?.label
                : "정보 없음"}
            </div>
						<div>{post.positionName || "포지션 미지정"}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectType;