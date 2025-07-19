import { formatDate } from "../../util/formatDate";
import type { Post } from "../../model/Post";
import type { User } from "../../store/userStore";
import Edit from "../../assets/icons/Edit.svg?react";
import Trash from "../../assets/icons/trash.svg?react";
import { useUserStore } from "../../store/userStore.ts";
import Button from "../../components/Button";
import type {TeamResponse} from "../../types/api.ts";

const Content = ({ post }: { post: TeamResponse | User }) => {
	const { user } = useUserStore();

	const isAuthor = user?.id && "userId" in post && user.id === post.userId;
	const createdAt = "createdAt" in post ? post.createdAt : post.updatedAt;

	return (
		<>
			<div className="flex justify-between">
				<div className="text-main text-[0.9375rem]">
					{formatDate(new Date(createdAt))}
				</div>
				{isAuthor ? (
					<div className="flex gap-3">
						<Edit />
						<Trash />
					</div>
				) : (
					<Button variant="square" onClick={() => console.log("채팅보내기")}>
						채팅보내기
					</Button>
				)}
			</div>
			<div className="text-2xl font-bold text-black mt-4">
				{"title" in post ? post.title : `${post.nickname}`}
			</div>
			<div className="text-[0.9375rem] text-gray mt-7">
				{"content" in post ? post.content : post.description}

			</div>
		</>
	);
};

export default Content;