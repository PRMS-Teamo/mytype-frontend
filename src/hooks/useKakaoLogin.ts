import {useUserStore} from "../store/userStore.ts";
import {useEffect} from "react";
import {useModalStore} from "../store/modalStore.ts";
import {useNavigate} from "react-router-dom";
export default function useKakaoLogin() {
  const setUser = useUserStore((s) => s.setUser);
  const nav=useNavigate();
  const logout = useUserStore((s) => s.clearUser);
  const { closeModal } = useModalStore();
  function login(platform: string) {
    const loginUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/${platform}`;
    const popup = window.open(
      loginUrl,
      "Teamo 로그인",
      'width=500,height=600,menubar=no,toolbar=no,location=no,status=no'
    )
    if (!popup) {
      alert("팝업 차단을 확인해주세요.")
      return
    }
  }
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== import.meta.env.VITE_BACKEND_URL) {
        console.warn("origin 다름", e.origin);
      }
      console.log('received Data', e.data);
      const receivedData = e.data;

      if (receivedData.status === "NEW") {
        nav('/mypage');
        console.log("신규 유저");
        return;
      } else if (receivedData.status === "EXISTING") {
        console.log("기존 유저");
      }
      console.log('received Data', receivedData);
      const userData = {
        userId: receivedData.userId,
        nickname: receivedData.nickname,
        address: receivedData.address,
        github: receivedData.github_url, //BE: 추후 수정
        beginner: receivedData.beginner, //BE: 항목 생성
        proceedMethod: receivedData.proceedMethod, // BE: 항목 생성
        position: receivedData.position_id,
        techStack: receivedData.user_stacks,
        introduction: receivedData.introduction, // BE: 항목 생성
        public: receivedData.public, // BE: 항목 생성
      }
      localStorage.setItem('accessToken', receivedData.accessToken);
      setUser(userData);
      closeModal();
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [setUser])

  return {
    login,
    logout,
  }
}