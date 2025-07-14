import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-[220px] h-[40px] gap-1 items-center rounded-full bg-[#F4F7FE] px-4 text-[#8F9BBA] text-sm cursor-pointer hover:bg-[#e2e8f0] transition"
    >
      <IoSearch className="text-[#2B3674] text-sm mr-1 ml-1" />
      <span className="text-black">검색</span>
    </div>
  );
};

export default SearchBar;