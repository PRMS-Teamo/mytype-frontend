import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useModalStore } from "../../store/modalStore";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  const { user, clearUser } = useUserStore();
  const { openModal } = useModalStore();

  const showSearch = ["/home", "/team", "/teammate"].includes(
    location.pathname
  );

  const handleAuth = () => {
    if (user) {
      clearUser();
    } else {
      openModal();
    }
  };

  return (
    <header className="w-full flex justify-end items-center px-8 py-4 bg-white mt-2 ">
      <div className="flex items-center gap-x-16 mr-6">
        <div className="w-[220px] h-[42px]">
          {showSearch ? (
            <div className="flex items-center w-full h-full rounded-full bg-[#F4F7FE] px-4 text-[#8F9BBA] text-sm">
              <IoSearch className="text-[#2B3674] text-sm mr-1 ml-1" />
              <span className="text-[#9CA3AF] ml-2">검색</span>
            </div>
          ) : null}
        </div>

        <button onClick={handleAuth} className="text-base text-[#3E3E3E]">
          {user ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;
