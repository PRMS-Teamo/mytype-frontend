import { useCallback } from 'react';
import { useModalStore } from '../store/modalStore';
import { useUserStore } from '../store/userStore';

interface KakaoProfile {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
    };
  };
}

const useKakaoLogin = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const setUser = useUserStore((s) => s.setUser);

  const login = useCallback(() => {
    if (!window.Kakao || !window.Kakao.Auth) {
      console.error('Kakao SDK가 초기화되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      success: () => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res: KakaoProfile) => {
            const userInfo = {
              id: String(res.id),
              nickname: res.kakao_account.profile.nickname,
            };
            setUser(userInfo);
            closeModal();
          },
          fail: (err: unknown) => {
            console.error('유저 정보 요청 실패', err);
          },
        });
      },
      fail: (err: unknown) => {
        console.error('카카오 로그인 실패', err);
      },
    });
  }, [closeModal, setUser]);

  return { login };
};

export default useKakaoLogin;