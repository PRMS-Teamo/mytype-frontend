import { usePostStore } from "../../store/postStore";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText";
import TextArea from "../../components/TextArea";
import Calendar from "../../components/Calendar/Calendar";
import ProceedMethod from "../../components/ProceedMethod";
import TechStack from "../../components/TechStack";
import PositionBtn from "../../components/PositionBtn";
import Label from "../../components/Label";
import { POST_CREATE } from "../../constants/post/post";
import { PLACEHOLDER } from "../../constants/placeholder/placeholders";
import { formatNumber } from "../../util/formatNumber";
import  type{ Position} from "../../hooks/usePositions";
import type { TechStackType } from "../../model/TeckStack";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { TeamsApi } from "../../api/teamsApi";
import type { Post, PositionDetail } from "../../model/Post";
import useTechStack from "../../hooks/useTechStack.ts";

const CreatePost = () => {
	const { createPost, setCreatePost, myPost } = usePostStore();
	const { user } = useUserStore();
	const [position, setPosition] = useState<Position | null>(null);
	const [positionDetails, setPositionDetails] = useState<PositionDetail[]>([]);
	const isEditMode = myPost !== null;

	const { createTeam } = TeamsApi();
	const { techStack } = useTechStack();

	useEffect(() => {
		if (myPost?.positions) {
			setPositionDetails(myPost.positions);
			setCreatePost({
				title: myPost.title,
				content: myPost.content,
				proceedType: myPost.proceedType,
				endDate: myPost.endDate ?? "",
				positions: myPost.positions,
			});
		}
	}, [myPost]);

	const handleSubmit = () => {
		if (!user) {
			alert("로그인 후 이용해주세요.");
			return;
		}

		const finalPost: Post = {
			teamId: createPost.teamId,
			title: createPost.title,
			content: createPost.content,
			isPublic: true,
			location: createPost.location,
			recruitStatus: "OPEN",
			proceedType: createPost.proceedType,
			endDate: createPost.endDate,
			userId: user.id,
			positions: positionDetails,
		};

		createTeam(finalPost);
	};

	const handleUpdate = () => {
		if (!user || !myPost) {
			alert("로그인 또는 게시글 정보를 확인해주세요.");
			return;
		}

		// const updatedPost: Post = {
		// 	...myPost,
		// 	title: createPost.title,
		// 	content: createPost.content,
		// 	proceedType: createPost.proceedType,
		// 	endDate: createPost.endDate,
		// 	userId: user.id,
		// 	positions: positionDetails,
		// };
		//
		// editTeam(updatedPost);
	};

	const handleCountChange = (value: string) => {
		if (!position) return;

		const count = parseInt(value.replace(/,/g, ""), 10) || 0;

		setPositionDetails((prev) => {
			const updated = prev.map((p) =>
				p.position.name === position.name ? { ...p, count } : p
			);

			setCreatePost({ positions: updated });
			return updated;
		});
	};

	const handleTechStackChange = (stacks: TechStackType[]) => {
		if (!position) return;
		setPositionDetails((prev) => {
			const updated = prev.map((p) =>
				p.position.id === position.id ? { ...p, positionStacks: stacks } : p
			);
			setCreatePost({ positions: updated });
			return updated;
		});
	};

	const currentDetail = positionDetails.find(
		(p) => p.position.id === position?.id
	);
	const currentCount = currentDetail?.count?.toString() ?? "0";
	const currentTechStack = currentDetail?.positionStacks ?? [];

	return (
		<div className="border border-gray-300 rounded-lg mt-6 mb-10 py-2 px-8 h-auto">
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<div className="text-black font-bold text-2xl">게시글 작성</div>
					<Button variant="primary" onClick={isEditMode ? handleUpdate : handleSubmit}>
						{isEditMode ? "수정하기" : "작성하기"}
					</Button>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.TITLE_LABEL}</Label>
					<InputText
						placeholder={PLACEHOLDER.TITLE}
						inputSize="medium"
						value={createPost.title}
						onChange={(e) => setCreatePost({ title: e.target.value })}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.CONTENT_LABEL}</Label>
					<TextArea
						value={createPost.content}
						onChange={(e) => setCreatePost({ content: e.target.value })}
					/>
				</div>

				<div>
					<Label>{POST_CREATE.RECRUITMENT_FIELD_LABEL}</Label>
					<PositionBtn value={position} onChange={setPosition} />
				</div>

				{position && (
					<>
						<div className="flex flex-col gap-2">
							<Label>{position.name} 모집 인원</Label>
							<InputText
								placeholder="인원"
								inputSize="small"
								type="text"
								value={currentCount}
								onChange={(e) => handleCountChange(e.target.value)}
								onInput={(e) => {
									e.currentTarget.value = formatNumber(e.currentTarget.value);
								}}
							/>
						</div>

						<div className="flex flex-col gap-2 w-full">
							<Label>{position.name} 기술 스택</Label>
							<TechStack
								value={currentTechStack.map((stack) => stack.id)}
								onChange={(stackIds) => {
									const selectedStacks = stackIds
										.map((id) => techStack.find((s) => s.id === id))
										.filter((s): s is TechStackType => !!s);

									handleTechStackChange(selectedStacks);
								}}
							/>
						</div>
					</>
				)}

				<div className="flex gap-5 w-full mb-5">
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.PROCEED_METHOD_LABEL}</Label>
						<ProceedMethod
							value={createPost.proceedType}
							onChange={(method) => setCreatePost({ proceedType: method })}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.REGION_LABEL}</Label>
						<InputText
							placeholder="지역"
							inputSize="tiny"
							value={createPost.location?? ""}
							onChange={(e) => setCreatePost({ location: e.target.value })}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.DEADLINE_LABEL}</Label>
						<Calendar
							value={createPost.endDate}
							onChange={(date) => setCreatePost({ endDate: date })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;