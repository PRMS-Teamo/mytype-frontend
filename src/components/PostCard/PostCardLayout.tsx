import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import Label from "./Label.tsx";
import type { LabelType } from "./Label.tsx";
import type { TechStackType } from "../../model/TeckStack.ts";

interface PostCardLayoutProps {
  date: string;
  isOnline?: string;
  content: string;
  labels: LabelType[];
  techStack: TechStackType[] | string[];
  type?: "team" | "teammate";
}

export default function PostCardLayout({
  date,
  isOnline,
  content,
  labels,
  techStack = [],
  type = "team",
}: PostCardLayoutProps) {
  const [showOverflow, setShowOverflow] = useState(false);
  const maxVisible = 7;


  const imageUrls =
  type === "teammate"
    ? (techStack as TechStackType[])
        .map((stack) => stack.stackImg)
        .filter(Boolean)
    : (techStack as string[]).filter(Boolean);

  const visibleStacks = imageUrls.slice(0, maxVisible);
  const overflowStacks = imageUrls.slice(maxVisible);

  useEffect(() => {
    const overflowLength = imageUrls.length - maxVisible;
    if (overflowLength <= 0) {
      setShowOverflow(false);
    }
  }, [imageUrls]);

  return (
    <div className="w-[350px] h-[370px] rounded-[20px] bg-white border border-gray-200 flex flex-col p-4">
      <div className="flex justify-between mx-4 mt-3 text-sm text-gray-600">
        <div className="text-sm font-semibold text-[#5932EA]">{date}</div>
        <div>{isOnline ? "온라인" : "오프라인"}</div>
      </div>

      <div className="w-[310px] h-[200px] rounded-[18px] bg-white border border-gray-200 flex flex-col p-7 justify-between mt-2 text-sm font-semibold">
        {content}
      </div>

      <div className="mt-6 mx-4 flex gap-2">
        {labels.map((label) => (
          <Label key={String(label)} type={label}>
            {label}
          </Label>
        ))}
      </div>

      <div className="mt-6 mx-4 flex gap-2 flex-wrap text-xs relative">
        
        {visibleStacks.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="기술 스택"
            className="w-6 h-6 rounded-full"
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