import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export default function SearchInput() {
  const navigate = useNavigate();

  return (
    <div
      className="w-[220px] h-[40px] flex items-center rounded-full bg-[#F4F7FE] hover:bg-[#e6eaf5] px-4 text-[#8F9BBA] text-sm cursor-pointer transition-colors"
      onClick={() => navigate("/search")}
    >
      <IoSearch className="text-[#2B3674] text-sm mr-1 ml-1" />
      <span className="text-[#8F9BBA] ml-1.5">검색</span>
    </div>
  );
}