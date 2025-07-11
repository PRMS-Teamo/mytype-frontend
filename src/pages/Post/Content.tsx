import { formatDate } from "../../util/formatDate";
import type { Post } from "../../model/Post";

const Content = ({ post }: { post: Post }) => {
	return (
		<>
			<div className="text-main text-[0.9375rem]">{formatDate(new Date(post.createdAt))}</div>
			<div className="text-2xl font-bold text-black mt-4">{post.title}</div>
			<div className="text-[0.9375rem] text-gray mt-7">{post.content}</div>
		</>
	);
};

export default Content;