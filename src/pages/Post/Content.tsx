
import { formatDate } from "../../util/formatDate";
import type {Post} from "../../model/Post";
import Edit from "../../assets/icons/Edit.svg?react"
import Trash from "../../assets/icons/trash.svg?react"
import {useUserStore} from "../../store/userStore.ts";
import Button from "../../components/Button";

const Content = ({ post }: { post: Post }) => {
	const { user } = useUserStore();
	//조건 수정 필요
	const isAuthor = user?.userId && post?.userId&& user.userId === post.userId;
	return (
		<>
			<div className="flex justify-between">
				<div className="text-main text-[0.9375rem]">{formatDate(new Date(post.createdAt))}</div>
				{isAuthor ? (
					<div className="flex gap-3">
					<Edit />
					<Trash />
					</div>):(<Button variant="square" onClick={()=> console.log("채팅보내기")
				}>채팅보내기</Button>)}
			</div>
			<div className="text-2xl font-bold text-black mt-4">{post.title}</div>
			<div className="text-[0.9375rem] text-gray mt-7">{post.content}</div>
		</>
	);
};

export default Content;