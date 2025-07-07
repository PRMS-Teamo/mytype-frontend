import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Label from "../Label";

interface PostCardLayoutProps {
  date: string;
  isOnline: boolean;
  content: string;
  label?: string;
  techStack: string[];
}

export default function PostCardLayout({
  date,
  isOnline,
  content,
  label,
  techStack,
}: PostCardLayoutProps) {
  const [showOverflow, setShowOverflow] = useState(false);

  const maxVisible = 5;
  const visibleStacks = techStack.slice(0, maxVisible);
  const overflowStacks = techStack.slice(maxVisible);

  return (
    <div className="w-[350px] h-[370px] rounded-[20px] bg-white border border-gray-200 flex flex-col p-4">
      {/* 날짜 & 온/오프라인 */}
      <div className="flex justify-between mx-4 mt-3 text-sm text-gray-600">
        <div className="text-sm font-semibold text-[#5932EA]">{date}</div>
        <div>{isOnline ? "온라인" : "오프라인"}</div>
      </div>

      {/* 내용 */}
      <div className="w-[310px] h-[200px] rounded-[18px] bg-white border border-gray-200 flex flex-col p-7 justify-between mt-2 text-sm font-semibold">
        {content}
      </div>

      {/* 라벨 */}
      {label && (
        <div className="mt-6 mx-4">
          <Label>{label}</Label>
        </div>
      )}

      {/* 기술 스택 */}
      <div className="mt-6 mx-4 flex gap-2 flex-wrap text-xs relative">
        {visibleStacks.map((stack) => (
          <span key={stack}>{stack}</span>
        ))}

        {overflowStacks.length > 0 && (
          <div className="relative">
            <BsThreeDots
              className="cursor-pointer"
              onClick={() => setShowOverflow((prev) => !prev)}
            />
            {showOverflow && (
              <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow p-2 z-10">
                {overflowStacks.map((stack) => (
                  <div key={stack} className="text-xs">
                    {stack}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
