import {useLocation, useNavigate} from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useModalStore } from "../../store/modalStore";
import { IoSearch } from "react-icons/io5";
import Button from "../Button/Button.tsx";
import {useMockUser} from "../../hooks/useMockUser.ts";
import {useEffect} from "react";


const Header = () => {
  const nav =useNavigate()
  const location = useLocation();
  const { user} = useUserStore();
  const { openModal } = useModalStore();
  const {login,logout,saveUser}=useMockUser()
  const showSearch = ["/home", "/team", "/teammate"].includes(
    location.pathname
  );
  const showProfileSave =["/mypage"].includes(location.pathname);

  const handleAuth = () => {
    if (user) {
      logout()
    } else {
      openModal();
    }
  };


  useEffect(() => {
    if (user && !user.hasProfile) {
      nav("/mypage");
    }
  }, [user]);
  return (
    <header className="w-full flex justify-end items-center px-8 pt-4 bg-white mt-2 ">
      <div className="flex items-center gap-x-8 mr-6">
        <div className="w-[220px] h-[42px]">
          {showSearch ? (
            <div className="flex items-center w-full h-full rounded-full bg-[#F4F7FE] px-4 text-[#8F9BBA] text-sm">
              <IoSearch className="text-[#2B3674] text-sm mr-1 ml-1" />
              <span className="text-[#9CA3AF] ml-2">검색</span>
            </div>
          ) : null}
        </div>
        {showProfileSave ? (
          <div className="">
            <Button  variant="primary" onClick={()=>saveUser()}>저장</Button>
          </div>
        ):null}
        <button onClick={handleAuth} className="text-base text-[#3E3E3E]">
          {user ? "로그아웃" : "로그인"}
        </button>
        <button onClick={() => login('exist')} className="mr-4">기존 유저로 로그인</button>
        <button onClick={() => login('new')} className="mr-4">새로운 유저로 로그인</button>
      </div>
    </header>
  );
};

export default Header;