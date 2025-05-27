import { type ReactNode } from "react";

interface SidebarElementProps {
  icon: ReactNode;
  text: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function SidebarElement({
  icon,
  text,
  isSelected = false,
  onClick,
}: SidebarElementProps) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-main text-white"
          : "bg-white text-gray hover:bg-gray-hover"
      }`}
      onClick={onClick}
    >
      <div className="text-xl">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

export default SidebarElement;
