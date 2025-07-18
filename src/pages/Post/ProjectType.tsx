import { POST_TEAM, POST_TEAMMATE } from "../../constants/post/post";
import { PROCEED_TYPE } from "../../constants/proceedType/proceedType";
import type { Post } from "../../model/Post";
import type { PostCardProps } from "../../components/PostCard/PostCard";
import { BEGINNER } from "../../constants/beginner/beginner";

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
            <div>{getProceedTypeLabel((post as Post).proceedType)}</div>

            <div className="flex gap-2 flex-wrap">
              {"techStack" in post && post.techStacks.length > 0 ? (
                post.techStacks.map((tech, index) => (
                  <span key={index}>{tech.name}</span>
                ))
              ) : (
                <span className="text-gray-400">기술 스택 없음</span>
              )}
            </div>

            <div>{"location" in post ? post.location : "?"}</div>

            <div className="flex gap-4 flex-wrap">
              {"positionCount" in post
                ? Object.entries(post.positionCount).map(
                    ([position, detail]) => (
                      <div key={position} className="flex gap-2">
                        <span>{position}</span>
                        <span>{detail.count}</span>
                      </div>
                    )
                  )
                : null}
            </div>
          </>
        ) : (
          <>
            <div>{getProceedTypeLabel(post.proceedType)}</div>

            <div className="flex gap-3 flex-wrap items-center">
              {"userStacks" in post && post.userStacks?.length ? (
                post.userStacks.map((stack, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <img
                      src={stack.stackImg}
                      alt={stack.name}
                      className="w-6 h-6"
                    />
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
