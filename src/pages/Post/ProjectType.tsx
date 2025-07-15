import {POST_TEAM, POST_TEAMMATE} from "../../constants/post/post";
import type { Post } from "../../model/Post";

const ProjectType = ({ post }: { post: Post }) => {
	if (!post) return null;
	const isTeamPost = post.filter === "팀원 구해요";
	const postInfo = isTeamPost ? POST_TEAM : POST_TEAMMATE;

	return (
		<div className="flex mt-12 gap-12 rounded-lg">
			<div className="gap-3 flex flex-col text-main font-bold">
				{Object.entries(postInfo).map(([_, value]) => (
					<div key={value}>{value}</div>
				))}
			</div>
			<div className="text-black gap-3 flex flex-col">
				{isTeamPost ? (
					<>
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
					</>
				) : (
					<>
						<div>닉네임</div>
						<div>깃허브아이디</div>
						<div>새싹여부</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProjectType;