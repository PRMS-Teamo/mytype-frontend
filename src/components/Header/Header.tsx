
import {useLocation} from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useModalStore } from "../../store/modalStore";
import Button from "../Button/Button.tsx";
import useKakaoLogin from "../../hooks/useKakaoLogin.ts";
import useProfile from "../../hooks/useProfile.ts";
import SearchInput from "../SearchInput/SearchInput.tsx";
import useUserValid from "../../hooks/useUserValid.ts";

const Header = () => {
  // const nav =useNavigate()
  const location = useLocation();
  const { user } = useUserStore();
  const { openModal } = useModalStore();
  const { saveUser } = useProfile();
  const { logout } = useKakaoLogin();
  const showSearch = ["/home", "/team", "/teammate"].includes(location.pathname);
  const showProfileSave = ["/mypage"].includes(location.pathname);
  // const noneHeader =["/post"].includes(location.pathname);
  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      openModal();
    }
  };
  const checkValid = useUserValid();

  return (
    <header className="w-full flex justify-end items-center px-8 pt-4 bg-white mt-2">
      <div className="flex items-center gap-x-8 mr-6">
        {showSearch && <SearchInput />}
        {showProfileSave && (
          <div className="">
            <Button  variant="primary" onClick={()=>user && saveUser()}>저장</Button>
          </div>
        )}
        <button onClick={handleAuth} className="text-base text-[#3E3E3E]">
          {user ? "로그아웃" : "로그인"}
        </button>
        <button onClick={() => console.log(checkValid)}>
          유저 정보 유효성 테스트
        </button>
      </div>
    </header>
  );
};

export default Header;