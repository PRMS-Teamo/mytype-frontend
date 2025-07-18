;import { usePostStore } from "../../store/postStore";
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
import type { Position } from "../../hooks/usePositions";
import type { TechStackType } from "../../model/TeckStack";
import {  useState } from "react";
import { useUserStore } from "../../store/userStore";
import { TeamsApi } from "../../api/teamsApi";
import type {Post, PositionDetail, PostPayload} from "../../model/Post";
import useTechStack from "../../hooks/useTechStack.ts";

const CreatePost = () => {
	const { myPost,setMyPost } = usePostStore();
	const { user } = useUserStore();
	const isEditMode = myPost !== null;
	const { techStack } = useTechStack();
	const { createTeam } = TeamsApi();

	const [post, setPost] = useState<Post>(() =>
			myPost ?? {
				teamId: "",
				userId: "",
				title: "",
				location: "",
				content: "",
				isPublic: true,
				recruitStatus: "OPEN",
				proceedType: "ONLINE",
				endDate: "",
				positions: [],
			}
	);
	const [position, setPosition] = useState<Position | null>(null);

	const handleChange = (field: keyof Post, value: any) => {
		setPost((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		if (!user) {
			alert("로그인 후 이용해주세요.");
			return;
		}

		const finalPost: PostPayload = {
			...post,
			userId: user.id,
			positions: post.positions.map((p) => ({
				positionId: p.position?.id ?? "",
				count: p.count,
				recruitStatus: p.recruitStatus,
				positionStacks: p.positionStacks.map((s) => s.id),
			})),
		};
		console.log(finalPost);

		createTeam(finalPost);
	};

	const handleCountChange = (value: string) => {
		if (!position) return;
		const count = parseInt(value.replace(/,/g, ""), 10) || 0;

		const updated = post.positions.map((p) =>
			p.position?.id === position.id ? { ...p, count } : p
		);
		handleChange("positions", updated);
	};

	const handleTechStackChange = (stacks: TechStackType[]) => {
		if (!position) return;
		const updated = post.positions.map((p) =>
			p.position.id === position.id ? { ...p, positionStacks: stacks } : p
		);
		handleChange("positions", updated);
	};
	const handleSelectPosition = (newPosition: Position) => {
		setPosition(newPosition);

		setPost((prev) => {
			const alreadyExists = prev.positions.some(
				(p) => p.position?.id === newPosition.id
			);
			if (alreadyExists) return prev;

			const newDetail: PositionDetail = {
				position: newPosition,
				count: 0,
				recruitStatus: "OPEN",
				positionStacks: [],
			};

			return {
				...prev,
				positions: [...prev.positions, newDetail],
			};
		});
	};
	const currentDetail = post.positions.find((p) => p.position?.id === position?.id);
	const currentCount = currentDetail?.count?.toString() ?? "0";
	const currentTechStack = currentDetail?.positionStacks ?? [];

	return (
		<div className="border border-gray-300 rounded-lg mt-6 mb-10 py-2 px-8 h-auto">
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<div className="text-black font-bold text-2xl">게시글 작성</div>
					<Button variant="primary" onClick={handleSubmit}>
						{isEditMode ? "수정하기" : "작성하기"}
					</Button>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.TITLE_LABEL}</Label>
					<InputText
						placeholder={PLACEHOLDER.TITLE}
						inputSize="medium"
						value={post.title}
						onChange={(e) => handleChange("title", e.target.value)}
					/>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<Label>{POST_CREATE.CONTENT_LABEL}</Label>
					<TextArea
						value={post.content}
						onChange={(e) => handleChange("content", e.target.value)}
					/>
				</div>

				<div>
					<Label>{POST_CREATE.RECRUITMENT_FIELD_LABEL}</Label>
					<PositionBtn value={position?.id} onChange={handleSelectPosition} />
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
							value={post.proceedType}
							onChange={(method) => handleChange("proceedType", method)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.REGION_LABEL}</Label>
						<InputText
							placeholder="지역"
							inputSize="tiny"
							value={post.location}
							onChange={(e) => handleChange("location", e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.DEADLINE_LABEL}</Label>
						<Calendar
							value={post.endDate}
							onChange={(date) => handleChange("endDate", date)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;