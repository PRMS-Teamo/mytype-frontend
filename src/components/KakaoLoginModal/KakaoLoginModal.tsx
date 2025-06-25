import useKakaoLogin from "../../hooks/useKakaoLogin";
import { useModalStore } from "../../store/modalStore";
import Logo from "../../assets/icons/logo.svg?react";
import logintalk from "../../assets/images/logintalk.png";
import kakao_login_medium_wide from "../../assets/images/kakao_login_medium_wide.png";

const KakaoLoginModal = () => {
  const { isOpen, closeModal } = useModalStore();
  const { login } = useKakaoLogin();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-[440px] h-[320px] shadow-xl relative">
        {/* 닫기 버튼 */}
        <button
          onClick={closeModal}
          className="absolute mr-4 top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>

        {/* 내부 콘텐츠 */}
        <div className="p-6 flex flex-col items-center gap-y-4">
          {/* 로고 */}
    <Logo className="w-[260px] h-[90px]" />
          {/* 설명 말풍선 */}
          <img
            src={logintalk}
            alt="Login Talk"
            className="w-[262px] h-[57px]"
          />

          {/* 카카오 로그인 버튼 */}
          <button onClick={login} className="w-full flex justify-center mt-6">
            <img
              src={kakao_login_medium_wide}
              alt="카카오 로그인"
              className="w-full max-w-[360px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};


export default KakaoLoginModal;