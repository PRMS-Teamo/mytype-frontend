import {useLocation} from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useModalStore } from "../../store/modalStore";

import Button from "../Button/Button.tsx";
import {useState} from "react";
import SearchBar from "../SearchBar";
import useKakaoLogin from "../../hooks/useKakaoLogin.ts";
import useProfile from "../../hooks/useProfile.ts";

const Header = () => {
  // const nav =useNavigate()
  const location = useLocation();
  const [search, setSearch] = useState("");
  const { user} = useUserStore();
  const { openModal } = useModalStore();
  const { saveUser } = useProfile();
  const showSearch = ["/home", "/team", "/teammate"].includes(
    location.pathname
  );
  const showProfileSave =["/mypage"].includes(location.pathname);
  const { logout } = useKakaoLogin();
  // const noneHeader =["/post"].includes(location.pathname);
  const handleAuth = () => {
    if (user) {
      logout()
    } else {
      openModal();
    }
  };
  return (
    <header className="w-full flex justify-end items-center px-8 pt-4 bg-white mt-2 ">
      <div className="flex items-center gap-x-8 mr-6">
        <div className="">
          {showSearch ? (
            <SearchBar value={search} onChange={setSearch} />
          ) : null}
        </div>
        {showProfileSave && (
          <div className="">
            <Button  variant="primary" onClick={()=>user && saveUser()}>저장</Button>
          </div>
        )}

        <button onClick={handleAuth} className="text-base text-[#3E3E3E]">
          {user ? "로그아웃" : "로그인"}
        </button>
        {/*<button onClick={() => console.log('테스트')} className="mr-4">기존 유저로 로그인</button>*/}
        {/*<button onClick={() => login("kakao")} className="mr-4">새로운 유저로 로그인</button>*/}
      </div>
    </header>
  );
};

export default Header;