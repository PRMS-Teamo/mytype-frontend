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
  // useEffect(() => {
  //   function handleMessage(e: MessageEvent) {
  //     if (e.origin !== import.meta.env.VITE_BACKEND_URL) {
  //       console.warn("origin 다름", e.origin);
  //     }
  //     console.log('e.data', e.data);
  //     const receivedData = e.data;
  //
  //     if (receivedData.status === "NEW") {
  //       nav('/mypage');
  //       return;
  //     } else if (receivedData.status === "EXISTING") {
  //       console.log("기존유저");
  //     }
  //     console.log('받은 데이터', receivedData);
  //     const userData = {
  //       id: receivedData.user.userId,
  //       nickname: receivedData.user.nickname,
  //       address: receivedData.user.address,
  //       github: receivedData.github_url, //BE: 추후 수정
  //       beginner: receivedData.beginner, //BE: 항목 생성
  //       proceedMethod: receivedData.proceedMethod, // BE: 항목 생성
  //       position: receivedData.position_id,
  //       techStack: receivedData.user_stacks,
  //       updatedAt: receivedData.updatedAt, //BE: 항목 생성
  //       introduction: receivedData.introduction, // BE: 항목 생성
  //       public: receivedData.public, // BE: 항목 생성
  //     }
  //
  //     console.log('userData',userData);;
  //     localStorage.setItem('accessToken', receivedData.accessToken);
  //     setUser(userData);
  //     closeModal();
  //   }

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.origin !== import.meta.env.VITE_BACKEND_URL) {
        console.warn("origin 다름", e.origin);
      }
      const receivedData = e.data;
      console.log("받은 데이터", receivedData);
      const { user, tokens, status } = receivedData;
      if (status === "NEW") {
        nav("/mypage");
        return;
      } else if (status === "EXISTING") {
        console.log("기존유저");
      }
      const userData = {
        id: user.id,
        nickname: user.nickname,
        github: user.github,
        profileImage: user.profileImage,
        location: user.location,
        isJoined: user.isJoined,
        isPublic: user.isPublic,
        positionId: user.positionId,
        description: user.description,
        proceedType: user.proceedType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        beginner: user.beginner,
        userStacks: user.userStacks,
      };
      console.log("userData", userData);
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
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