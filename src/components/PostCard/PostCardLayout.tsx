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
  return (
    <div className="w-[350px] h-[370px] rounded-[20px] bg-white border border-gray-200  flex flex-col p-4">
      <div className="flex justify-between mx-4 mt-2 text-sm text-gray-600">
        <div>{date}</div>
        <div>{isOnline ? "온라인" : "오프라인"}</div>
      </div>

      <div className="w-[310px] h-[200px] rounded-[18px] bg-white border border-gray-200 flex flex-col p-4 justify-between mt-2 text-sm">
        {content}
      </div>

      <div className="mt-6 mx-4">
        <Label>{label}</Label>
      </div>

      <div className="mt-6 mx-4 flex gap-2 flex-wrap text-xs text-[#555]">
        {techStack.map((stack) => (
          <span key={stack}>{stack}</span>
        ))}
      </div>
    </div>
  );
}
