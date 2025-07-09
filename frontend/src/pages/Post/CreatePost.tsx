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
import type { PositionType } from "../../model/Post.ts";
import { useState } from "react";

type PositionDetail = {
	count: number;
	techStack: string[];
};

const CreatePost = () => {
	const { createPost, setCreatePost } = usePostStore();

	const [position, setPosition] = useState<PositionType | null>(null);
	const [positionDetails, setPositionDetails] = useState<Partial<Record<PositionType, PositionDetail>>>({});

	const handleSubmit = () => {
		const finalPost = {
			...createPost,
			positionCount: positionDetails,
		};
		console.log("게시글 데이터:", finalPost);
	};

	const handleCountChange = (value: string) => {
		if (!position) return;
		const count = parseInt(value.replace(/,/g, ""), 10) || 0;

		setPositionDetails((prev) => ({
			...prev,
			[position]: {
				...(prev[position] || { count: 0, techStack: [] }),
				count,
			},
		}));
	};

	const handleTechStackChange = (updated: string[]) => {
		if (!position) return;
		setPositionDetails((prev) => ({
			...prev,
			[position]: {
				...(prev[position] || { count: 0, techStack: [] }),
				techStack: updated,
			},
		}));
	};

	const currentCount = position ? positionDetails[position]?.count?.toString() ?? "0" : "0";
	const currentTechStack = position ? positionDetails[position]?.techStack ?? [] : [];

	return (
		<div className="border border-gray-300 rounded-lg mt-6 mb-10 py-2 px-8 h-auto">
			<div className="flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<div className="text-black font-bold text-2xl">게시글 작성</div>
					<Button variant="primary" onClick={handleSubmit}>
						작성하기
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
							<Label>{position} 모집 인원</Label>
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
							<Label>{position} 기술 스택</Label>
							<TechStack value={currentTechStack} onChange={handleTechStackChange} />
						</div>
					</>
				)}
				<div className="flex gap-5 w-full mb-5">
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.PROCEED_METHOD_LABEL}</Label>
						<ProceedMethod
							value={createPost.proceedMethod}
							onChange={(method) => setCreatePost({ proceedMethod: method })}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.REGION_LABEL}</Label>
						<InputText
							placeholder="지역"
							inputSize="tiny"
							value={createPost.region}
							onChange={(e) => setCreatePost({ region: e.target.value })}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>{POST_CREATE.DEADLINE_LABEL}</Label>
						<Calendar
							value={createPost.deadline}
							onChange={(date) => setCreatePost({ deadline: date })}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePost;