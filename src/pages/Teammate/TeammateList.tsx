
import useTeammate from "../../hooks/useTeammate";
import { useTeammateStore } from "../../store/teammateStore.ts";
import PostCard from "../../components/PostCard/PostCard.tsx";
import {useNavigate} from "react-router-dom";

const TeammateList = () => {
	const nav = useNavigate();
	const { teammates } = useTeammateStore();
	useTeammate();
	const handleClick = (id: string) => {
		nav(`/findteammate/${id}`);
	};
	return (
		<div className=" w-[1140px] grid grid-cols-3 gap-6 p-10 mt-8">
			{teammates.map((user) => {
				const userWithCardInfo= {
					...user,
					proceedMethod: user.proceedType || "온라인",
					techStack: user.userStack || [],
					introduction: user.description || "",
					updatedAt: user.updatedAt,
				};

				return (
					<div key={user.id} onClick={() => handleClick(user.id)}>
						<PostCard type="teammate" post={userWithCardInfo} />
					</div>
				);
			})}
		</div>
	);
};

export default TeammateList;