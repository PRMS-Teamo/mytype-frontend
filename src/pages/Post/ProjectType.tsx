import { POST_TEAM, POST_TEAMMATE } from "../../constants/post/post";
import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";

const ProjectType = ({ post }: { post: Post | User }) => {
	if (!post) return null;

	const isTeamPost = "filter" in post && post.filter === "팀원 구해요";
	const postInfo = isTeamPost ? POST_TEAM : POST_TEAMMATE;

	return (
		<div className="flex mt-12 gap-12 rounded-lg">
			{/* 왼쪽 라벨 */}
			<div className="gap-3 flex flex-col text-main font-bold min-w-[100px]">
				{Object.entries(postInfo).map(([_, value]) => (
					<div key={value}>{value}</div>
				))}
			</div>

			{/* 오른쪽 값 */}
			<div className="text-black gap-3 flex flex-col">
				{isTeamPost ? (
					<>
						<div>{post.proceedType}</div>
						<div className="flex gap-2 flex-wrap">
							{"techStack" in post && post.techStack.length > 0 ? (
								post.techStack.map((tech, index) => <span key={index}>{tech}</span>)
							) : (
								<span className="text-gray-400">기술 스택 없음</span>
							)}
						</div>
						<div>{post.region}</div>
						<div className="flex gap-4 flex-wrap">
							{"positionCount" in post
								? Object.entries(post.positionCount).map(([position, detail]) => (
									<div key={position} className="flex gap-2">
										<span>{position}</span>
										<span>{detail.count}</span>
									</div>
								))
								: null}
						</div>
					</>
				) : (
					<>
						<div>{post.nickname || "닉네임 없음"}</div>
						<div>{"github" in post && post.github  || "깃허브 없음"}</div>
						<div>{"beginner" in post && post.beginner }</div>
						<div>{post.proceedType || "진행방식 미지정"}</div>
						<div>{"location" in post && post.location || "지역 미지정"}</div>
						<div className="flex gap-2 flex-wrap">
							{"userStack" in post && post.userStack?.length ? (
								post.userStack.map((stack, index) => <span key={index}>{stack}</span>)
							) : (
								<span className="text-gray-400">기술 스택 없음</span>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProjectType;