import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import Label from "./Label.tsx";
import type { LabelType } from "./Label.tsx";
import type {TechStackType} from "../../model/TeckStack.ts";

interface PostCardLayoutProps {
  date: string;
  isOnline?: string;
  content: string;
  labels: LabelType[];
  techStack: TechStackType[];
}

export default function PostCardLayout({
  date,
  isOnline,
  content,
  labels,
  techStack=[]
}: PostCardLayoutProps) {
  const [showOverflow, setShowOverflow] = useState(false);
  const maxVisible = 5;

  const visibleStacks = techStack.slice(0, maxVisible);
  const overflowStacks = techStack.slice(maxVisible);

  // 오버플로우가 사라질 경우 팝업 닫기
  useEffect(() => {
    const overflowLength = techStack.length - maxVisible;
    if (overflowLength <= 0) {
      setShowOverflow(false);
    }
  }, [techStack]);

  return (
    <div className="w-[350px] h-[370px] rounded-[20px] bg-white border border-gray-200 flex flex-col p-4">
      {/* 날짜 + 온오프라인 */}
      <div className="flex justify-between mx-4 mt-3 text-sm text-gray-600">
        <div className="text-sm font-semibold text-[#5932EA]">{date}</div>
        <div>{isOnline ? "온라인" : "오프라인"}</div>
      </div>

      {/* 내용 */}
      <div className="w-[310px] h-[200px] rounded-[18px] bg-white border border-gray-200 flex flex-col p-7 justify-between mt-2 text-sm font-semibold">
        {content}
      </div>

      {/* 라벨 */}
      <div className="mt-6 mx-4 flex gap-2">
        {labels.map((label) => (
          <Label key={String(label)} type={label}>
            {label}
          </Label>
        ))}
      </div>

      {/* 기술 스택 아이콘 */}
      <div className="mt-6 mx-4 flex gap-2 flex-wrap text-xs relative">
        {visibleStacks.map((url) => (
          <img
            key={url}
            src={url}
            alt="기술 스택"
            className="w-6 h-6 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "/default-tech-icon.png"; // 대체 이미지 경로
            }}
          />
        ))}

        {overflowStacks.length > 0 && (
          <div className="relative">
            <BsThreeDots
              className="cursor-pointer"
              onClick={() => setShowOverflow((prev) => !prev)}
            />
            {showOverflow && (
              <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow p-2 z-10 flex flex-wrap gap-2">
                {overflowStacks.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="기술 스택"
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = "/default-tech-icon.png";
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}