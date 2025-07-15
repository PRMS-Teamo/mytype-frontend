import { useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useModalStore } from "../../store/modalStore";
import Button from "../Button/Button.tsx";
import useKakaoLogin from "../../hooks/useKakaoLogin.ts";
import useProfile from "../../hooks/useProfile.ts";
import SearchInput from "../SearchInput/SearchInput.tsx";

const Header = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const { openModal } = useModalStore();
  const { saveUser } = useProfile();
  const { logout } = useKakaoLogin();

  const showSearch = ["/home", "/team", "/teammate"].includes(location.pathname);
  const showProfileSave = ["/mypage"].includes(location.pathname);

  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      openModal();
    }
  };

  return (
    <header className="w-full flex justify-end items-center px-8 pt-4 bg-white mt-2">
      <div className="flex items-center gap-x-8 mr-6">
        {showSearch && <SearchInput />}
        {showProfileSave && (
          <Button variant="primary" onClick={() => user && saveUser(user)}>
            저장
          </Button>
        )}
        <button onClick={handleAuth} className="text-base text-[#3E3E3E]">
          {user ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
};

export default Header;