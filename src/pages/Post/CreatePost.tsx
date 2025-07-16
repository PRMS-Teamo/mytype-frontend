import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { useUserStore } from "../../store/userStore";
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
import usePosition from "../../hooks/usePositions";
import useTechStack from "../../hooks/useTechStack";
import axiosInstance from "../../api/axiosInstance";
import type { CreatePostPayload, Position } from "../../types/api";
import type { PositionType } from "../../model/Post";

const CreatePost = () => {
  const { createPost, setCreatePost, myPost } = usePostStore();
  const { user } = useUserStore();

  const [position, setPosition] = useState<PositionType | null>(null);
  const [positionDetails, setPositionDetails] = useState<
    Partial<Record<PositionType, { count: number; techStack: string[] }>>
  >({});

  const { positions: positionList } = usePosition();
  const { techStack: techStackList } = useTechStack();

	useEffect(() => {
		if (myPost?.positionCount) {
			setPositionDetails(myPost.positionCount);
			if (!createPost.positionCount) {
				setCreatePost({
					positionCount: myPost.positionCount,
					techStacks: myPost.techStacks,
				});
			}
		}
	}, [myPost]);

  const handleSubmit = async () => {
		if (!user) {
			alert("로그인 후 이용해주세요.");
			return;
		}
	
		if (!positionList.length) {
			alert("포지션 목록이 로딩되지 않았습니다.");
			return;
		}
	
		const positions: Position[] = Object.entries(positionDetails).map(
			([positionName, detail]) => {
				const foundPosition = positionList.find(
					(p) => p.name.trim().toLowerCase() === positionName.trim().toLowerCase()
				);
	
				if (!foundPosition) {
					alert(`"${positionName}" 포지션 ID를 찾을 수 없습니다.`);
					throw new Error("positionId not found");
				}
	
				const mappedStacks = detail.techStack.map((stackName) => {
					const matchedStack = techStackList.find((s) => s.name === stackName);
					return {
						stackId: matchedStack?.id || "",
						stackName,
						imgUrl: matchedStack?.img || "",
					};
				});
	
				return {
					positionId: foundPosition.id,
					positionName: foundPosition.name, 
					count: detail.count,
					users: [],
					positionStacks: mappedStacks,
				};
			}
		);
	
		const postData: CreatePostPayload = {
			title: createPost.title,
			content: createPost.content,
			proceedType: createPost.proceedMethod as "ONLINE" | "OFFLINE" | "BOTH",
			imgUrl: "",
			isPublic: true,
			recruitStatus: "OPEN",
			endDate: createPost.deadline,
			positions,
		};
	
		try {
			const res = await axiosInstance.post("/teams", postData);
			console.log("✅ 게시글 생성 성공:", res.data);
		} catch (err) {
			console.error("❌ 게시글 생성 실패:", err);
		}
	};

  const handleCountChange = (value: string) => {
    if (!position) return;
    const count = parseInt(value.replace(/,/g, ""), 10) || 0;
    setPositionDetails((prev) => {
      const updated = {
        ...prev,
        [position]: {
          ...(prev[position] || { count: 0, techStack: [] }),
          count,
        },
      };
      setCreatePost({ positionCount: updated });
      return updated;
    });
  };

  const handleTechStackChange = (updatedTechStacks: string[]) => {
    if (!position) return;
    setPositionDetails((prev) => {
      const updated = {
        ...prev,
        [position]: {
          ...(prev[position] || { count: 0, techStack: [] }),
          techStack: updatedTechStacks,
        },
      };
      setCreatePost({ positionCount: updated });
      return updated;
    });
  };

  const currentCount = position ? positionDetails[position]?.count?.toString() ?? "0" : "0";
  const currentTechStack = position ? positionDetails[position]?.techStack ?? [] : [];

  return (
    <div className="border border-gray-300 rounded-lg mt-6 mb-10 py-2 px-8 h-auto">
      <div className="flex flex-col gap-5 mt-4">
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
              <Label>{POST_CREATE.RECRUITMENT_COUNT_LABEL}</Label>
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
              <Label>{POST_CREATE.TECH_STACK_LABEL}</Label>
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