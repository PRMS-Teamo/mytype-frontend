// src/pages/ProjectType.tsx
import { POST_TEAM } from "../../constants/post/post";
import type { Post } from "../../model/Post";

const ProjectType = ({ post }: { post: Post }) => {
	return (
		<div className="flex mt-12 gap-12 rounded-lg">
			<div className="gap-3 flex flex-col text-main font-bold">
				{Object.entries(POST_TEAM).map(([_, value]) => (
					<div key={value}>{value}</div>
				))}
			</div>
			<div className="text-black gap-3 flex flex-col">
				<div>{post.proceedMethod}</div>
				<div className="flex gap-2 flex-wrap">
					{post.techStack.length > 0 ? (
						post.techStack.map((tech, index) => <span key={index}>{tech}</span>)
					) : (
						<span className="text-gray-400">기술 스택 없음</span>
					)}
				</div>
				<div>{post.region}</div>
				<div className="flex gap-4 flex-wrap">
					{Object.entries(post.positionCount).map(([position, detail]) => (
						<div key={position} className="flex gap-2">
							<span>{position}</span>
							<span>{detail.count}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectType;